import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const fetchJobViews = await db.category.findMany({
      include: {
        professions: {
          include: {
            skills: true
          }
        },

        jobs: true,
        visitor: true,
      },
    },
    )

    return new Response(JSON.stringify(fetchJobViews), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
