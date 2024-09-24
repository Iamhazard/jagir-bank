
import { db } from "@/lib/db";

import { NextResponse } from "next/server";


interface IParams {
  countryId?: string;
}

export async function GET(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const { countryId } = params;
    if (!countryId) {
      return new Response('country ID is missing', { status: 400 });
    }
    const Country = await db.country.findUnique({
      where: {
        id: countryId
      },

    });


    return NextResponse.json(Country)
  } catch (error) {
    console.log(error)
    return new Response("Method Not Allowed", { status: 500 });

  }


}