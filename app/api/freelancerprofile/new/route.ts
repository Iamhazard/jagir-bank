import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      userId,
      country,
      zip,
      address,
      Statename,
      name,
      contact,
      hourlyrate,
      estimatedamount,
      message,
      category,
      language,
      imageUrl,
    } = body;

    if (!userId) {
      return new Response('No user ID is provided', { status: 400 });
    }

    const checkProfile = await db.freelancerProfile.findUnique({
      where: {
        userId: userId,
      },
    });

    if (checkProfile) {
      return NextResponse.json({ error: "Freelancer profile already exists" }, { status: 400 });
    }

    const FreelancerProfile = await db.freelancerProfile.create({
      data: {
        name: name,
        contact: contact,
        zip: zip,
        StreetAddress: address,
        state: Statename,
        hourlyrate: hourlyrate,
        estimatedamount: estimatedamount,
        message: message,
        language: language,
        countries: {
          create: country.map((countryId: string) => ({
            country: { connect: { id: countryId } },
          })),
        },
        skills: {
          create: category.map((skill: any) => ({
            skill: { connect: { id: skill.skillId } },
          })),
        },
        profession: {
          create: category.map((p: any) => ({
            profession: { connect: { id: p.professionId } },
          })),
        },
        imageInput: imageUrl,
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json({ message: FreelancerProfile }, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/profile/new:', error);
    return NextResponse.json({ error: 'Failed to create freelancer profile' }, { status: 500 });
  }
}
