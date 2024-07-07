import { db } from "@/lib/db";
import { JobTypeEnum } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    if(req.method=="POST"){
        try {

            const {type}=await req.json()

if (!type) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

            const newCategory=await db.jobType.create({
                data:{
                    type: type as JobTypeEnum,
                  
                }
            })
            return new Response(JSON.stringify(newCategory), { status: 201 });
            
        } catch (error) {
            console.log(error)
            
        }


}
}