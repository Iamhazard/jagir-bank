//to delete proposal
import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/db";

import { NextResponse } from "next/server";


interface IParams {
  jobId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
 try {
   const {jobId}=params;

   const currentUser=await getCurrentUser()


    if (!currentUser?.id) {
      return NextResponse.json(null);
    }

    const existingpropsal=await db .proposal.findUnique({
        where:{
            id:jobId
        },
        include:{
            job:true
        }
    })

      if (!existingpropsal) {
      return new NextResponse('Invalid ID', { status: 400 });
    }

    const deletedproposal= await db.proposal.deleteMany({
      where: {
        id: jobId,
       
      },
    });

   

    return NextResponse.json(deletedproposal)
    
 } catch (error) {
    console.log(error,"Error_on_delete")
    return NextResponse.json(null);
 }

}
