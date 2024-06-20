import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    if(req.method=="POST"){
        try {

            const {profession,id}=await req.json()
            

if (!profession|| !id) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

            const newProfession=await db.profession.create({
                data:{
                    profession:profession,
                    category:{
                        connect:{
                            id:id
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