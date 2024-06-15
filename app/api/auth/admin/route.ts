import { LoginSchema } from "@/Schemas";
import { getUserRoleByEmail } from "@/data/role";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmations";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { UserRole } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs"; 
import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";

export async function POST (request:Request,values:z.infer<typeof LoginSchema>,callbackUrl?: string | null,
  role?:UserRole){
    try {
       const validatedFields=LoginSchema.safeParse(values);
       if(!validatedFields.success){
        return new NextResponse("Invalid fields",{status:500})

       }

       const {email,password,code}=validatedFields.data;

       const getRole=await db.user.findFirst({
        where:{
            email:email,
            role:UserRole.ADMIN
        }
        
       })

    if (!getRole) {
      return new NextResponse("Not an admin", { status: 401 });
    }
    if(getRole ){
 try {
         const existingRole= await getUserRoleByEmail(email)
     if (!existingRole) {
      return { error: "role does not exist!" };
    }
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "Email does not exist!" };
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser?.email || ""
      );

      await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

      return { success: "Confirmation email sent!" };


    }
     if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );

        if (!twoFactorToken) {
          return { error: "Invalid code!" };
        }

        if (twoFactorToken.token !== code) {
          return { error: "Invalid code!" };
        }

        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return { error: "Code expired!" };
        }

        await db.twoFactorToken.delete({
          where: { id: twoFactorToken.id },
        });

        const existingConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id
        );

        if (existingConfirmation) {
          await db.twoFactorConfirmation.delete({
            where: { id: existingConfirmation.id },
          });
        }

        await db.twoFactorConfirmation.create({
          data: {
            userId: existingUser.id,
          },
        });
      } else {
        const twoFactorToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(
          twoFactorToken.email,
          twoFactorToken.token
        );

        return { twoFactor: true };
      }
    }
    try {
        await signIn("credentials",{
            email,
            role:existingRole,
            password,
            
        })
        
    } catch (error) {
         if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return { error: "Invalid credentials!" };
          default:
            return { error: "Something went wrong!" };
        }
      }
       return new NextResponse("Not an admin", { status: 401 });  
    }

        
    } catch (error) {
        return new NextResponse("Not an admin", { status: 401 }); 
    }
    }else{
       return new NextResponse("Not an admin", { status: 401 }); 
    }
   
   
    
    } catch (error) {
        throw error;
    }
}