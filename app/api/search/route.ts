
import { db } from "@/lib/db";
import { NextApiRequest } from "next";

import { NextResponse } from "next/server";


export interface IQuery {
  q?: string;
}


export async function GET(
  request: NextApiRequest,
) {
  try {
    const { q } = request.query as IQuery;
     const searchResults = await db.job.findMany({
      where: {
        OR: [
          { post: { contains: q as string, mode: 'insensitive' } }, 
          { jobDescription: { contains: q as string, mode: 'insensitive' } }, 
        ],
        SkillsOnJobs: {
          some: {
            skill: {
              title: { contains: q || '', mode: 'insensitive' }, 
            },
          },
        },
      },
      include: {
        SkillsOnJobs: {
          include: {
            skill: true,
          },
        },
        clientProfile: true, 
      },
    });

    return NextResponse.json(searchResults)
  } catch (error) {
    console.log(error)
    return new Response("Internal Server Error", { status:500 });
    
  }

  
}
