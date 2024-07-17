import { NextRequest, NextResponse } from "next/server";



export const POST =async (req:NextRequest,res:NextResponse)=>{
    if(req.method == "POST"){
        try {
            const {}=await req.json()
        } catch (error) {
            
        }
    }
}