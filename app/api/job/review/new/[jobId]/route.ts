
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface IParams {
    jobId?: string;
}

export async function GET(request: Request, { params }: { params: IParams }) {
    try {

        const jobId = params.jobId;

        // const { userId } = Request.json;

        const review = await db.review.findFirst({
            where: {
                jobId: jobId,

            },
            select: {
                rating: true,
            }
        });

        if (!review) {
            return new NextResponse('No review found for this job', { status: 404 });
        }

        return NextResponse.json({ rating: review.rating });
    } catch (error) {
        console.log(error, 'ERROR_MESSAGES');
        return new NextResponse('Error', { status: 500 });
    }
}
