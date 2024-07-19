import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";



export const POST =async (req:NextRequest,res:NextResponse)=>{
    if(req.method == "POST"){
        try {
            const {userId, title, Skills, Role, Description, photos}=await req.json()

             if(!userId){
                return new NextResponse("Unauthorized",{status:401})
             }
             const newPortfolio=await db.portfolio.create({
                data:{
                    userId,
        title,
        Skills,
        Role,
        Description,
        photos,
                    
                }
             })
        } catch (error) {
           return new NextResponse("unable to create a new Portfolio",{status:500})
        }
    }
}