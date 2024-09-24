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
            return new Response('user ID is missing', { status: 400 });
        }


        const clientProfile = await db.clientProfile.findUnique({
            where: {
                userId: userId,
            },
            include: {
                user: true,
            },
        });

        if (!clientProfile) {
            return new Response('ClientProfile not found', { status: 404 });
        }

        return NextResponse.json(clientProfile);
    } catch (error) {
        console.log(error);
        return new Response("Method Not Allowed", { status: 500 });
    }
}
