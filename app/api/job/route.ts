
import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest, response:NextResponse
  
) {
  if(request.method === 'GET')
  try {

     const Alljobs=await db.job.findMany({
       include: {
         clientProfile: true,
          proposals: true,
          ratings:true,
          SkillsOnJobs: {
            include: {
              skill: true,
            },
          },
        
        },
        orderBy:{
          createdAt: 'desc'
        }
       
    })
    const jobs = Alljobs.map((item)=>{
      const  {SkillsOnJobs,...rest}= item;
      return{...rest, skills : SkillsOnJobs.map((soj)=>soj.skill)}
    })

 const currentDate = new Date();
    const oneMonthAgo = new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000); 
    const filteredJobs = jobs.filter((job) => {
      const jobDate = new Date(job.createdAt);
      return jobDate >= oneMonthAgo;
    });

    //Sort filtered jobs based on createdAt date in descending order
    const sortedJobs = filteredJobs.sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });

    return NextResponse.json(sortedJobs);
    //return NextResponse.json(jobs)
  } catch (error) {
    console.error(error)
    return new Response("Method Not Allowed", { status: 405 });
  }

  
}
