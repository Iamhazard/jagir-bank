import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    if(req.method=="POST"){
        try {

            const {title}=await req.json()

if (!title) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

            const newCategory=await db.category.create({
                data:{
                    title,
                  
                }
            })
            return new Response(JSON.stringify(newCategory), { status: 201 });
            
        } catch (error) {
            console.log(error)
            
        }


}
}