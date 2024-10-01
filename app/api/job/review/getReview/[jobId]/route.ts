import getCurrentUser from "@/actions/getCurrentUser";

import { db } from "@/lib/db";
import { NextResponse } from "next/server";




interface IParams {
    jobId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {

    try {
        const currentUser = await getCurrentUser();
        const userId = currentUser?.id
        const jobId = params.jobId

        const body = await request.json();
        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }
        const reviews = await db.review.findFirst({
            where: {
                jobId: jobId,
                userId: userId,

            }
        });

        if (reviews) {
            return new NextResponse('You have already applied for this job', { status: 400 });
        }






        return NextResponse.json(reviews)
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES')
        return new NextResponse('Error', { status: 500 });
    }

}