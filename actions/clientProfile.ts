"use server";

import { ClientProfileSchema, ClientSchema } from "@/Schemas";

import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

import * as z from "zod";



export const clientProfile = async (values: z.infer<typeof ClientProfileSchema>) => {
  try {
    const existingUser = await currentUser();

    if (!existingUser) {
      return { error: "Unauthorized" };
    }


    const dbUser = await getUserById(existingUser?.id as string);

    if (!dbUser) {
      return { error: "Unauthorized" };
    }

    const validatedFields = ClientProfileSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid fields" };
    }

    const { country, jobs: jobData, device, browserName, userAgent } = validatedFields.data;

    const existingClientProfile = await db.clientProfile.findFirst({ where: { userId: dbUser.id } });


    //let clientProfile: { id: any; userId?: string; country:string; };

    let clientProfile = await db.clientProfile.findFirst({
      where: { userId: dbUser.id },
      include: { user: true } // Include user to check if it exists
    });


    // If a ClientProfile exists, use it; otherwise, create a new one
    if (clientProfile) {

      clientProfile = await db.clientProfile.update({
        where: { id: clientProfile.id },
        data: { country },
        include: { user: true }
      });
    } else {
      clientProfile = await db.clientProfile.create({
        data: {
          user: { connect: { id: dbUser.id } },
          country,
        },
        include: { user: true }
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
      const { skills, from, to, fixed, category, ...rest } = job;
      const getCategory = await db.category.findUnique({
        where: {
          id: category
        }
      });
      if (!getCategory) {
        throw new Error(`Category with id ${category} not found`);
      }
      const skillIds = skills.map(skill => ({ skillId: skill.skill }));
      const createdJob = await db.job.create({
        data: {
          clientProfile: {
            connect: {
              id: clientProfile!.id
            }
          },
          Category: {
            connect: {
              id: category
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
        include: {
          SkillsOnJobs: {
            include: {
              skill: true
            }
          }
        }
      });

      // Create JobView for each created job
      await db.jobView.create({
        data: {
          job: { connect: { id: createdJob.id } },
          category: { connect: { id: category } },
          device,
          browserName,
          userAgent,
          viewCount: 1, // Initialize view count to 1
        },
      });

      return createdJob;
    }));

    return { success: "Profile and jobs created successfully", clientProfile, jobs: createdJobs };

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