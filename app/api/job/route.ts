
import { db } from "@/lib/db";

import { NextResponse } from "next/server";




export async function GET(
  request: Request,
  
) {
  try {

     const Alljobs=await db.job.findMany({
        include:{
           SkillsOnJobs: {
          include: {
            skill: true, 
          }
        }
        }
       
    })
    const jobs = Alljobs.map((item)=>{
      const  {SkillsOnJobs,...rest}= item;
      return{...rest, skills : SkillsOnJobs.map((skillsOnJob)=>skillsOnJob.skill)}
    })
    return NextResponse.json(jobs)
  } catch (error) {
    console.error(error)
    return new Response("Method Not Allowed", { status: 405 });
  }

  
}
