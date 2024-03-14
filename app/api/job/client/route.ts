
import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/db";

import { NextResponse } from "next/server";


export async function GET(
  request: Request,
 
) {
  try {
     const currentUser = await getCurrentUser();
    const userId= currentUser?.id

if (!userId) {
      return new Response('UID is missing', { status: 400 });
    }
    const clientProposal = await db.proposal.findMany({
     include: {
      job:{
        select: { post : true} 
      },
       
    
       
      },
      
    });
   
    
    return NextResponse.json(clientProposal)
  } catch (error) {
    console.log(error)
    return new Response("Method Not Allowed", { status: 500 });
    
  }

  
}