
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest, res: NextResponse,) => {

    if (req.method === "GET") {
        try {
            const getAllReview = await db.review.findMany();
            if (!getAllReview) {
                return new Response("Users not found", { status: 404 });
            }
            return new Response(JSON.stringify(getAllReview), { status: 200 });
        } catch (error) {
            console.error(error);
            return new Response("Internal Server Error", { status: 500 });
        }
    } else {
        return new Response("Method Not Allowed", { status: 405 });
    }
}
