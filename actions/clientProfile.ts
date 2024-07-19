"use server";

import { ClientSchema } from "@/Schemas";

import {  getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import * as z from "zod";

export const clientProfile = async (values: z.infer<typeof ClientSchema>) => {
try {
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



     //check if existing Client Profile
     
 const existingClientProfile=await db.clientProfile.findFirst({where:{userId:dbUser.id}});


 //let clientProfile: { id: any; userId?: string; country:string; };

 let clientProfile = await db.clientProfile.findFirst({ 
      where: { userId: dbUser.id },
      include: { user: true } // Include user to check if it exists
    });

 if (clientProfile?.id) {
  throw new Error("Client profile is already exist");
}
 // If a ClientProfile exists, use it; otherwise, create a new one

   if (!clientProfile) {
      clientProfile = await db.clientProfile.create({
        data: {
          user: { connect: { id: dbUser.id } },
          country,
        },
        include: { user: true } // Include user in the result
      });
    } else {
      clientProfile = await db.clientProfile.update({
        where: { id: clientProfile.id },
        data: {
          country,
        },
        include: { user: true } // Include user in the result
      });
    }
 if (!clientProfile.user) {
      throw new Error("User not found for ClientProfile");
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
  const {skills,from,to,fixed,category,...rest} = job;
  const getCategory = await db.category.findUnique({
      where: {
        id: category
      }
    });
  const skillIds = skills.map(skill => ({skillId: skill.skill} ));
  return db.job.create({
    data: {
       clientProfile: {
          connect: {
            id: clientProfile!.id
          }
        },
        
      Category:{
        connect: {
          id:category
        }
      },
       from: from || "", 
          to: to || "", 
          fixed: fixed || "",

      ...rest,
      SkillsOnJobs: {
        createMany: {
          data: skillIds
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
  
} catch (error) {
  console.error("Error in clientProfile function:", error);
    return { error: "An unexpected error occurred. Please try again." };
}
}