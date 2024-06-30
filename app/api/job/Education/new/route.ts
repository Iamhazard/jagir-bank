import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    if(req.method=="POST"){
        try {

            const {name}=await req.json()

if (!name) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

            const newCategory=await db.education.create({
                data:{
                    name,
                  
                }
            })
            return new Response(JSON.stringify(newCategory), { status: 201 });
            
        } catch (error) {
            console.log(error)
            
        }


}
}