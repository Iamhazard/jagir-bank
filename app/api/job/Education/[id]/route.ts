import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
interface IParams {
  organizationId?: string;
}

export const DELETE = async (req: NextRequest, res: NextResponse,{params}:{params:IParams}) => {
 const { organizationId } =params;
    if(req.method =='DELETE'){
        try {

         
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
            const DeleteOrgainzation=await db.category.delete({
                where:{
                    id:organizationId
                },
               
            })
            return new Response(JSON.stringify(DeleteOrgainzation), { status: 201 });
        } catch (error) {
            console.log(error)
        }


}
}