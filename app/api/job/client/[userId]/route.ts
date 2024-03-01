
import { db } from "@/lib/db";

import { NextResponse } from "next/server";


interface IParams {
  userId?: string;
}

export async function GET(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const {userId}=params;
if (!userId) {
      return new Response('Client ID is missing', { status: 400 });
    }
    const clientJobs = await db.job.findMany({
   where: {
        clientProfile: {
          userId: userId,
        }
        },
     include: {
        SkillsOnJobs: {
          include: {
            skill: true,
          },
        },
      },
      
    });
    if (!clientJobs || clientJobs.length === 0) {
      return new Response('Client jobs not found', { status: 404 });
    }
    
    return NextResponse.json(clientJobs)
  } catch (error) {
    console.log(error)
    return new Response("Method Not Allowed", { status: 500 });
    
  }

  
}
