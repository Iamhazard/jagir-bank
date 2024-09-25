import { db } from "@/lib/db";
import { NextResponse } from "next/server";

interface IParams {
    proposalId?: string;
}

export async function PATCH(request: Request, { params }: { params: IParams }) {
    try {
        const { proposalId } = params;
        const { interviewLink } = await request.json();


        const proposal = await db.proposal.findUnique({
            where: { id: proposalId },
        });

        if (!proposal) {
            return new NextResponse('Proposal not found', { status: 404 });
        }

        const updatedProposal = await db.proposal.update({
            where: { id: proposalId },
            data: {
                status: 'INTERVIEW',
                interviewLink: interviewLink,
            },
        });

        return NextResponse.json(updatedProposal);
    } catch (error) {
        console.log(error, 'ERROR_UPDATING_PROPOSAL');
        return new NextResponse('Error updating proposal', { status: 500 });
    }
}
