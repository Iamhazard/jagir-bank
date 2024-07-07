import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
interface IParams {
  id?: string;
}

export const DELETE = async (req: NextRequest, res: NextResponse,{params}:{params:IParams}) => {
 const { id } =params;
    if(req.method =='DELETE'){
        try {

         
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
            const DeleteJobtype=await db.jobType.delete({
                where:{
                    id:id
                },
               
            })
            return new Response(JSON.stringify(DeleteJobtype), { status: 201 });
        } catch (error) {
            console.log(error)
        }


}
}