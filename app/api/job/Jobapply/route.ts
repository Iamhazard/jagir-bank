import getCurrentUser from "@/actions/getCurrentUser";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request:Request){

  try {
      const currentUser = await getCurrentUser();
    const userId= currentUser?.id
     const body = await request.json();
    const {
duration,
estimatedAmount,
hourlyRate,
message,
attachments,
JobId
}=body;

 if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

const proposal=await db.proposal.create({
    data:{
        duration,
        hourlyRate,
        coverLetter:message,
        userId:userId || "",
        JobId,
        estimatedAmount,
         status: 'PENDING',
         attachments,



    }
    
})
 return NextResponse.json(proposal)
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
  }

}