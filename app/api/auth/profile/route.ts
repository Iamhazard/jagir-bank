import { db } from "@/lib/db";
import { createDwollaCustomer } from "@/lib/dwolla.actions";
import { extractCustomerIdFromUrl } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method === "POST") {
    try {
      const ProfileData=await req.json();
      const { userId, title, Skills, Role, Description, photos } = ProfileData();

      if (!userId) {
        return new NextResponse("Unauthorized", { status: 401 });
      }

      let newProfileAccount;

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

      if(!newProfileAccount) 
        return new NextResponse("Error creating user")

      const dwollaCustomerUrl=await createDwollaCustomer({
        ...ProfileData,
        type:'personal'
      })

      if(!dwollaCustomerUrl) throw new Error("Error creating Dwolla customer")

        const dwollaCustomerId=extractCustomerIdFromUrl(dwollaCustomerUrl)

        const dwollaRecord = await db.dwolla.create({
        data: {
          userId,
          dwollaCustomerId,
          dwollaCustomerUrl
        }
      });
     return new NextResponse(JSON.stringify({
        portfolio: newPortfolio,
        dwolla: dwollaRecord
      }), {
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