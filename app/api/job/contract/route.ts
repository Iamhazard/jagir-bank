import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    if (req.method !== "POST") {
        return new NextResponse("Method Not Allowed", { status: 405 });
    }

    try {
        const { userId, Amount, proposalId, jobId, servicesFee, deadlines } = await req.json();

        // Validate required fields
        if (!userId || !proposalId || !Amount || !jobId || !deadlines) {
            return new NextResponse("Bad Request: Missing required fields", { status: 400 });
        }

        // Create the contract in the database
        const newContract = await db.contact.create({
            data: {
                userId,
                proposalId,
                jobId,
                Amount,
                servicesFee,
                Deadlines: deadlines,
                status: 'ACTIVE',
            },
        });

        return new NextResponse(JSON.stringify(newContract), { status: 201 });
    } catch (error) {
        console.error("Error creating contract:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
};
