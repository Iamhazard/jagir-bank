"use server";

import { ClientSchema } from "@/Schemas";

import {  getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
// import { sendVerificationEmail } from "@/lib/mail";
// import { getMessageEmbedding } from "@/lib/opeanai";
// import { jobsIndex } from "@/lib/pinecone";
// import { generateVerificationToken } from "@/lib/token";

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


// const embedding=await  getFreelancerEmbedding(country,post,skills1,skills2,skills3,projectSize,duration,expertise,from,to,fixed,jobDescription);

//  const jobs=await db.$transaction(async(tx)=>{

//   await jobsIndex.upsert([
//      {
//       id:client.id,
//       values:embedding,
//       metadata:{id:dbUser.id}
//     }
//   ])
//    return client;

//  })

 
  const client=  await db.clientProfile.create({
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

// async function getFreelancerEmbedding(
//         post:string,
//         country:string,
//       skills1:string,
//       skills2:string,
//       skills3:string,
//       projectSize:string,
//       duration:string,
//       expertise:string,
//       from:string,
//       to:string,
//       fixed:string,
//       jobDescription:string,
      
//       ){
  
//         return getMessageEmbedding(`${country}\n${post}\n${skills1}\n${skills2}\n${skills3}\n${projectSize}\n${duration}\n${expertise}\n${from}\n${to}\n${fixed}\n${jobDescription}`);
// }