
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

interface IParams {
  categoryId?: string;
}
export  async function GET(req: NextRequest,{params}:{params:IParams}) {
  const { categoryId } =params;
  if (req.method === "GET") {
    try {
      const category = await db.category.findUnique({
        where: {
          id: categoryId
        },
       
      });
      if (!category) {
        return new Response("Category not found", { status: 404 });
      }
      return new Response(JSON.stringify(category), { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Internal Server Error", { status: 500 });
    }
  } else {
    return new Response("Method Not Allowed", { status: 405 });
  }
}
