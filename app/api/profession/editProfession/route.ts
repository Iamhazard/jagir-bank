import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {

    if(req.method =='PATCH'){
        try {

           const {professionId,profession}= await req.json();

           const professionCheck=await db.profession.findUnique(
            {
                where:{
                    id:professionId
                }
            }
           )
           if(!professionCheck){
              return new NextResponse("Category not found", { status: 401 });
           }
            const updatedCategory=await db.category.update({
                where:{
                    id:professionId
                },
                data:{
                    professions:profession
                }
            })
            return new Response(JSON.stringify(updatedCategory), { status: 201 });
        } catch (error) {
            
        }


}
}