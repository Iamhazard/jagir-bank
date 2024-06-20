import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, res: NextResponse) => {
  if (req.method == "POST") {
    try {
      const { title, professionId } = await req.json();

      if (!title || !professionId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      const Skills = await db.skills.create({
        data: {
          title,
         profession:{connect:{id:professionId}}
        },
        include:{profession:true}
      });
      return new Response(JSON.stringify(Skills), { status: 201 });
    } catch (error) {
      console.log(error);
    }
  }
};
