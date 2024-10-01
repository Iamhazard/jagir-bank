import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: { userId: string } }
) {
    try {
        const { userId } = params;
        if (!userId) {
            return new NextResponse('User ID is missing', { status: 400 });
        }

        const freelancerContracts = await db.contact.findMany({
            where: {
                userId: userId,
                status: 'COMPLETED'
            },
            select: {
                Amount: true
            }
        });

        const totalEarnings = freelancerContracts.reduce((sum, contract) => {
            return sum + parseFloat(contract.Amount);
        }, 0);

        return NextResponse.json({ totalEarnings: totalEarnings.toFixed(2) });
    } catch (error) {
        console.error('Error calculating freelancer earnings:', error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}