
import { db } from "@/lib/db";

import { NextResponse } from "next/server";
export interface IParams {
  userId?: string;
}


export async function GET(
  request: Request,
  { params }: { params: IParams }
) {
  const { userId } = params

  if (!userId) {
    return new Response('user ID is missing', { status: 400 });
  }
  try {

    const allclient = await db.clientProfile.findUnique({
      where: { userId: userId },
      include: {
        Jobs: {
          include: {
            proposals: {
              include: {
                user: true
              }
            }
          }
        },



      },


    })

    if (!allclient) {
      return new Response('Client profile not found', { status: 404 });
    }
    const jobs = allclient.Jobs;
    return NextResponse.json(jobs)
  } catch (error) {
    console.error(error)
    return new Response("Method Not Allowed", { status: 405 });
  }


}
