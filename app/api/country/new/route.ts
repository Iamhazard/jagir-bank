import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {

    if(req.method=="POST"){
        try {

            const {country}=await req.json()

if (!country) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
const checkcountry=await db.country.findFirst({
    where:{
        name:country
    }
})
if(checkcountry){
    return new NextResponse("Country already exists", { status: 401 });
}
            const newCountry=await db.country.create({
                data:{
                    name:country,
                  
                }
            })
            return new Response(JSON.stringify(newCountry), { status: 201 });
            
        } catch (error) {
            console.log(error)
            
        }
}
}