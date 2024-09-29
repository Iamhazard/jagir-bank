//to delete proposal
import getCurrentUser from "@/actions/getCurrentUser";
import { db } from "@/lib/db";

import { NextResponse } from "next/server";


interface IParams {
    proposalId?: string;
}

export async function GET(
    request: Request,
    { params }: { params: IParams }
) {
    try {
        const { proposalId } = params;

        const currentUser = await getCurrentUser()


        if (!currentUser?.id) {
            return NextResponse.json(null);
        }

        const existingpropsal = await db.proposal.findUnique({
            where: {
                id: proposalId
            },
            include: {
                job: {
                    include: {
                        proposals: {
                            include: {
                                user: true
                            }
                        },
                        clientProfile: {
                            include: {
                                user: true
                            }
                        }
                    }
                }
            }

        })

        if (!existingpropsal) {
            return new NextResponse('Invalid ID', { status: 400 });
        }




        return NextResponse.json(existingpropsal)

    } catch (error) {
        console.log(error, "Error_on_delete")
        return NextResponse.json(null);
    }

}
