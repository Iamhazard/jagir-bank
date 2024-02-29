
import { db } from "@/lib/db";

import { NextResponse } from "next/server";


interface IParams {
  jobId?: string;
}

export async function GET(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const {jobId}=params;

    const clientskills = await db.skillsOnJobs.findMany({
      where: {
        jobId
      },
      include: {
             skill: { select: { title: true } }
        
      }
    });
      const skillTitles = clientskills.map(skillOnJob => skillOnJob.skill);
    
    return NextResponse.json(skillTitles)
  } catch (error) {
    console.log(error)
    return new Response("Method Not Allowed", { status: 405 });
    
  }

  
}
