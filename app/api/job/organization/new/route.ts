import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    if(req.method=="POST"){
        try {

            const {organization}=await req.json()

if (!organization) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

            const newCategory=await db.organizationType.create({
                data:{
                    organization,
                  
                }
            })
            return new Response(JSON.stringify(newCategory), { status: 201 });
            
        } catch (error) {
            console.log(error)
            
        }


}
}