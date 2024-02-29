
import { db } from "@/lib/db";

import { NextResponse } from "next/server";


export async function GET(
  request: Request,
  
) {
  try {

     const allclient=await db.clientProfile.findMany()
   
    return NextResponse.json(allclient)
  } catch (error) {
    console.error(error)
    return new Response("Method Not Allowed", { status: 405 });
  }

  
}
