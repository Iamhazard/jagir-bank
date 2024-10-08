import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export interface IParams {
    proposalId?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    if (request.method !== "GET") {
        return new Response("Method Not Allowed", { status: 405 });
    }

    const { proposalId } = params;
    console.log("Proposal ID:", proposalId);


    if (!proposalId) {
        return new Response('Proposal ID is missing', { status: 400 });
    }

    try {

        const contract = await db.contact.findFirst({
            where: {
                proposalId: proposalId,
            },
        });

        // Check if the contract exists
        if (!contract) {
            return new Response('Contract not found', { status: 404 });
        }

        // Return the found contract
        return NextResponse.json(contract);
    } catch (error) {
        console.error("Database error: ", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
