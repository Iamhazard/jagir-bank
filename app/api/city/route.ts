import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {

    if(req.method =='PATCH'){
        try {

           const {cityId,cityname}= await req.json();

           const professionCheck=await db.profession.findUnique(
            {
                where:{
                    id:cityId
                }
            }
           )
           if(!professionCheck){
              return new NextResponse("city not found", { status: 401 });
           }
            const updatedCategory=await db.city.update({
                where:{
                    id:cityId
                },
                data:{
                    name:cityname
                }
            })
            return new Response(JSON.stringify(updatedCategory), { status: 201 });
        } catch (error) {
            
        }


}
}