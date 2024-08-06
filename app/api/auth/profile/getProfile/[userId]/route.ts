
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
            return new Response('User Id is missing', { status: 400 });
        }
        const ProfileById = await db.profile.findUnique({
            where: {
                id: userId
            },
            include: {

                user: true
            }

        });


        return NextResponse.json(ProfileById)
    } catch (error) {
        console.log(error)
        return new Response("Method Not Allowed", { status: 500 });

    }


}