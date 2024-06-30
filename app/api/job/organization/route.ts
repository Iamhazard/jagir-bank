import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {

    if(req.method =='PATCH'){
        try {

           const {organizationId,organizationName}= await req.json();

           const organizationCheck=await db.organizationType.findUnique(
            {
                where:{
                    id:organizationId
                }
            }
           )
           if(!organizationCheck){
              return new NextResponse("Organization type  not found", { status: 401 });
           }
            const updatedCategory=await db.organizationType.update({
                where:{
                    id:organizationId
                },
                data:{
                    organization:organizationName
                }
            })
            return new Response(JSON.stringify(updatedCategory), { status: 201 });
        } catch (error) {
              console.error('Error updating organization:', error);
            return new NextResponse("Internal Server Error", { status: 500 });
        }
    } else {
        return new NextResponse("Method Not Allowed", { status: 405 });
    }
        }

