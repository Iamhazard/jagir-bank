
import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

import { NextResponse } from "next/server";


export interface IQuery {
  q?: string;
}




export async function GET(
  request: Request,
  
) {
  try {
      const body = await request.json();
    const { q } = body;
    console.log({q})
     const searchResults = await db.job.findMany({
      where: {
        SkillsOnJobs:{
          some: {
         skill:{
             title: { contains: q || "", mode: 'insensitive' },
         }
          }
        }

      },
       include: {
        SkillsOnJobs: true,
        clientProfile: true 
      }
       
      })

    return NextResponse.json(searchResults)
  } catch (error) {
    console.log(error)
    return new Response("Internal Server Error", { status:500 });
    
  }

  
}
