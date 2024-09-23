import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface IParams {
    userId?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { userId } = params;
        if (!userId) {
            return new NextResponse('User Id is missing', { status: 400 });
        }

        const freelancerProfile = await db.freelancerProfile.findUnique({
            where: {
                userId: userId
            },
            include: {
                profession: true,
                countries: true,
                skills: true
            }
        });

        if (!freelancerProfile) {
            return new NextResponse('FreelancerProfile not found', { status: 404 });
        }

        return NextResponse.json(freelancerProfile);
    } catch (error) {
        console.error(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}