import getCurrentUser from "@/actions/getCurrentUser";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";




interface IParams {
  jobId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {

  try {
    const currentUser = await getCurrentUser();
    const userId = currentUser?.id
    const jobId = params.jobId

    const body = await request.json();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }
    const existingApplication = await db.proposal.findFirst({
      where: {
        jobId: jobId,
        userId: userId,

      }
    });

    if (existingApplication) {
      return new NextResponse('You have already applied for this job', { status: 400 });
    }

    const {
      duration,
      estimatedAmount,
      imageUrl,
      hourlyRate,
      serviceFee,
      message,
      clientProfileId,
    } = body;

    console.log({ body })
    if (!currentUser?.id || !currentUser?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }



    const proposal = await db.proposal.create({
      data: {
        duration,
        hourlyRate,
        serviceFee: parseFloat(serviceFee),
        Coverletter: message,
        estimatedAmount: estimatedAmount,
        status: 'PENDING',
        image: imageUrl,
        job: {
          connect: {
            id: jobId
          }
        },
        user: {
          connect: {
            id: userId
          },

        },



      }

    })
    return NextResponse.json(proposal)
  } catch (error) {
    console.log(error, 'ERROR_MESSAGES')
    return new NextResponse('Error', { status: 500 });
  }

}