import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const PATCH = async (req: NextRequest, res: NextResponse) => {

    if(req.method =='PATCH'){
        try {

           const {countryId,countryName}= await req.json();

           const countryCheck=await db.country.findUnique(
            {
                where:{
                    id:countryId
                }
            }
           )
           if(!countryCheck){
              return new NextResponse("Country not found", { status: 401 });
           }
            const updatedCountry=await db.category.update({
                where:{
                    id:countryId
                },
                data:{
                    title:countryName
                }
            })
            return new Response(JSON.stringify(updatedCountry), { status: 201 });
        } catch (error) {
            
        }


}
}