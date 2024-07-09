import { LoginSchema } from "@/Schemas";
import { getUserRoleByEmail } from "@/data/role";
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmations";
import { getTwoFactorTokenByEmail } from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { AuthError } from "next-auth";

export const POST= async(request:NextRequest,values:z.infer<typeof LoginSchema>,callbackUrl?: string | null,
  role?:UserRole)=>{
    try {
          const body = await request.json();
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
      return NextResponse.json({ error: "role does not exist!" });
    }
    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return NextResponse.json({ error: "Email does not exist!" });
    }

    if (!existingUser.emailVerified) {
      const verificationToken = await generateVerificationToken(
        existingUser?.email || ""
        
      );
  await sendVerificationEmail(
        verificationToken.email,
        verificationToken.token
      );

       return NextResponse.json({ success: "Confirmation email sent!" }, { status: 200 });

    }
     if (existingUser.isTwoFactorEnabled && existingUser.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(
          existingUser.email
        );

       if (!twoFactorToken || twoFactorToken.token !== code || new Date(twoFactorToken.expires) < new Date()) {
          return NextResponse.json({ error: "Invalid or expired code!" }, { status: 400 });
        }


        const hasExpired = new Date(twoFactorToken.expires) < new Date();

        if (hasExpired) {
          return NextResponse.json({ error: "Code expired!" },{status:400});
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

        return NextResponse.json({ twoFactor: true },{status:200});
      }
    }
      const isPasswordValid = await bcrypt.compare(password, existingUser.password || "");
    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials!" }, { status: 401 });
    }
    try {
        await signIn("credentials",{
            email,
            role:existingRole,
            password,
            redirect: false,
            callbackUrl:'',
            
        })
         return NextResponse.json({ success: "Sign-in successful" }, { status: 200 });
    } catch (error) {
         if (error instanceof AuthError) {
        switch (error.type) {
          case "CredentialsSignin":
            return NextResponse.json({ error: "Invalid credentials!" }, { status: 401 });
          default:
            return NextResponse.json({ error: "Something went wrong!" }, { status: 500 });
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
      console.log(error)
      return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
        
        
    }
}