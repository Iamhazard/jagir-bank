import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  try {
    const skillsWithCategories = await db.skills.findMany({
      include: {
        profession: {
          include: {
            category: true,
          },
        },
      },
    });

    if (skillsWithCategories.length === 0) {
      return new Response("No skills found", { status: 404 });
    }

    return new Response(JSON.stringify(skillsWithCategories), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
