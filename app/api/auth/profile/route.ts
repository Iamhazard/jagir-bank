import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const { userId, title, Skills, Role, Description, photos } = await req.json();

      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }


    // Check if profile already exists for this user
    const existingProfile = await db.profile.findUnique({
      where: { userId: userId }
    });

    if (existingProfile) {
      return new NextResponse("Profile already exists for this user",{status:400});
    }

      const newPortfolio = await db.portfolio.create({
        data: {
          userId,
          title,
          Skills,
          Role,
          Description,
          photos,
        }
      });

      return new NextResponse(JSON.stringify(newPortfolio), {
        status: 201,
        headers: { 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error("Error creating portfolio:", error);
      return new NextResponse("Unable to create a new Portfolio", { status: 500 });
    }
  } else {
    return new NextResponse("Method Not Allowed", { status: 405 });
  }
}