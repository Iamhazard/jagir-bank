"use server";

import { ClientSchema } from "@/Schemas";

import {  getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";

import * as z from "zod";

export const clientProfile = async (values: z.infer<typeof ClientSchema>) => {

  const existingUser=await currentUser();

  if (!existingUser) {
    return { error: "Unauthorized" };
  }

   const dbUser = await getUserById(existingUser?.id as string);
// console.log("first",dbUser)
  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const validatedFiled = ClientSchema.safeParse(values);

  if (!validatedFiled.success) {
    return { error: "Invalid fields" };
  }
  const { country,post,skills1,skills2,skills3,projectSize,duration,expertise,from,to,fixed,jobDescription} = validatedFiled.data;


  await db.clientProfile.create({
    data: {
       user: { connect: { id:dbUser.id }},
      country,
      post,
      skills1,
      skills2,
      skills3,
      projectSize,
      duration,
      expertise,
      from,
      to,
      fixed,
      jobDescription,   
       
    },
  });

  //for verification
  // const verificationToken = await generateVerificationToken(email);

  // await sendVerificationEmail(verificationToken.email, verificationToken.token);

  // return { success: "confirmation email Sent!" };
};
