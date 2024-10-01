import { db } from "@/lib/db";
import { NextResponse } from "next/server";

// export interface IParams {
//     contractId?: string;
// }

export async function PATCH(
    request: Request,
) {
    if (request.method !== "PATCH") {
        return new Response("Method Not Allowed", { status: 405 });
    }
    const body = await request.json();

    const { contractId, status } = body;
    //console.log("Proposal ID:", proposalId);


    if (!contractId) {
        return new Response('Proposal ID is missing', { status: 400 });
    }

    try {

        const contract = await db.contact.update({
            where: {
                id: contractId,
            },
            data: {
                status: status,
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
