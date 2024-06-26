import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    if(req.method=="POST"){
        try {

            const {name,countryId}=await req.json()
            

if (!name|| !countryId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

            const newCity=await db.city.create({
                data:{
                    name:name,
                    country:{
                        connect:{
                            id:countryId
                        },
                    },
                   
                     
                  
                }
            })
            return new Response(JSON.stringify(newCity), { status: 201 });
            
        } catch (error) {
            console.log(error)
            
        }


}
}