
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
if (!jobId) {
      return new Response('Client ID is missing', { status: 400 });
    }
    const clientJobs = await db.job.findUnique({
   where: {
        id:jobId
        },
     include: {
        SkillsOnJobs: {
          include: {
            skill: true,
          },
        },
      },
      
    });
   
    
    return NextResponse.json(clientJobs)
  } catch (error) {
    console.log(error)
    return new Response("Method Not Allowed", { status: 500 });
    
  }

  
}
