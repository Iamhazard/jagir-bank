import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    if (req.method !== "POST") {
        return new NextResponse("Method Not Allowed", { status: 405 });
    }

    try {
        const { contractId, userId, rating, review, jobId } = await req.json();

        if (!contractId || !userId || rating === undefined) {
            return new NextResponse("Missing required fields", { status: 400 });
        }

        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            return new NextResponse("Invalid rating. Must be a number between 1 and 5", { status: 400 });
        }
        const currentUser = await getCurrentUser();

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const contract = await db.contact.findUnique({
            where: { id: contractId },
            include: { job: true },
        });
        const newReview = await db.review.create({
            data: {
                contractId,
                userId: userId,
                rating,
                comment: review,
                jobId: jobId,
            },
        });

        return new NextResponse(JSON.stringify(newReview), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error("Error creating review:", error);
        if (error instanceof Error) {
            return new NextResponse(`Error: ${error.message}`, { status: 500 });
        }
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};