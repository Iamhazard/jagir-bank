
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
        post:{
          contains: q || "",
         
          }
        }

     })
       

    return NextResponse.json(searchResults)
  } catch (error) {
    console.log(error)
    return new Response("Internal Server Error", { status:500 });
    
  }

  
}
