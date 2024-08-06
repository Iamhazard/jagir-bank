
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export  const GET =async(req: NextRequest, res: NextResponse,) =>{
  
  if (req.method === "GET") {
    try {
      const getAllProfile = await db.profile.findMany();
      if (!getAllProfile) {
        return new Response("Profile not found", { status: 404 });
      }
      return new Response(JSON.stringify(getAllProfile), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Internal Server Error", { status: 500 });
    }
  } else {
    return new Response("Method Not Allowed", { status: 405 });
  }
}
