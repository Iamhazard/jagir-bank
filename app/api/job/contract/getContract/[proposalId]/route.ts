
import { db } from "@/lib/db";

import { NextResponse } from "next/server";
export interface IParams {
    proposalId?: string;
}


export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    const { proposalId } = params

    if (!proposalId) {
        return new Response('user ID is missing', { status: 400 });
    }
    try {

        const allclient = await db.clientProfile.findUnique({
            where: {
                id: proposalId
            }


        })

        if (!allclient) {
            return new Response('Client profile not found', { status: 404 });
        }

        return NextResponse.json(allclient)
    } catch (error) {
        console.error(error)
        return new Response("Method Not Allowed", { status: 405 });
    }


}
