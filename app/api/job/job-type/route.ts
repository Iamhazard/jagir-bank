import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {

    if(req.method =='PATCH'){
        try {

           const {id,type}= await req.json();

           const organizationCheck=await db.jobType.findUnique(
            {
                where:{
                    id:id
                }
            }
           )
           if(!organizationCheck){
              return new NextResponse("Organization type  not found", { status: 401 });
           }
            const updatedJobtype=await db.jobType.update({
                where:{
                    id:id
                },
                data:{
                    type:type
                }
            })
            return new Response(JSON.stringify(updatedJobtype), { status: 201 });
        } catch (error) {
              console.error('Error updating organization:', error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    } else {
        return new NextResponse("Method Not Allowed", { status: 405 });
    }
        }
