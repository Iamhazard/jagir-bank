
import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/db";

import { NextResponse } from "next/server";


interface IParams {
  categoryId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const {categoryId}=params;

     const categoryIds=await db.skills.findUnique({
        where:{
            id:categoryId
        },
       
    })
    return NextResponse.json(categoryIds)
  } catch (error) {
    
  }

  
}
