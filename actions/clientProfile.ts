"use server";

import { ClientSchema } from "@/Schemas";

import {  getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import * as z from "zod";
import getCurrentUser from "./getCurrentUser";

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
 

  const { country,jobs:jobData} = validatedFiled.data;
const UserId=getCurrentUser();

     //check if existing Client Profile
     
 const existingClientProfile=await db.clientProfile.findFirst({where:{userId:dbUser.id}});


 //let clientProfile: { id: any; userId?: string; country:string; };

 let clientProfile = await db.clientProfile.findFirst({ where: { userId: dbUser.id } });

 
 // If a ClientProfile exists, use it; otherwise, create a new one

  if (existingClientProfile) {
    clientProfile = existingClientProfile;
  } else {
    clientProfile = await db.clientProfile.create({
      data: {
        user: { connect: { id: dbUser.id } },
        country,
      },
    });
  }

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



const createdJobs = await Promise.all(jobData.map(async (job) => {
  const {skills,from,to,fixed,...rest} = job;
  const skillIds = skills.map(skill =>  skill.skill );
  return db.job.create({
    data: {
      clientProfileId: clientProfile.id,
       from: from || "", 
          to: to || "", 
          fixed: fixed || "",

      ...rest,
      SkillsOnJobs: {
        createMany: {
          data: skillIds.map(skillId => ({
            skillId: skillId.toString()
          }))
        }
      },      
    },
    include:{
      SkillsOnJobs:{
        include: {
          skill: true
        }
      }
    }
  });
}));


 
     
  

  //for verification
  // const verificationToken = await generateVerificationToken(email);

  // await sendVerificationEmail(verificationToken.email, verificationToken.token);
  return { success: "Profile and jobs created successfully", clientProfile, jobs: createdJobs};

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