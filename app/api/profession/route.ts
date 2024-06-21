import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    if(req.method=="POST"){
        try {

            const {profession,categoryId}=await req.json()
            

if (!profession|| !categoryId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

            const newProfession=await db.profession.create({
                data:{
                    profession:profession,
                    category:{
                        connect:{
                            id:categoryId
                        },
                    },
                   
                     
                  
                }
            })
            return new Response(JSON.stringify(newProfession), { status: 201 });
            
        } catch (error) {
            console.log(error)
            
        }


}
}