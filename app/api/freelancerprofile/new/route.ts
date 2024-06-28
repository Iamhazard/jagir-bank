import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
      console.log("body",body)
    const {
      userId,
      countries,
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
      imageInput,
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
        profession: {
            create: category.flatMap((cat:any) =>
              cat.professions.map((prof:any) => ({ professionId: prof.profession }))
            ),
          },
           skills: {
            create: category.flatMap((cat: { skills: any[]; }) =>
              cat.skills.map((skl: { skill: any; }) => ({ skillId: skl.skill }))
            ),
          },
          countries: {
            create: countries.flatMap((cnt: { country: any[]; city: any[]; }) =>
              cnt.country.map((c: {
                [x: string]: any; countryname: any; 
}) => ({
                countryId: c.countryname,
              
               cityId:c.countryname              
              }))
            ),
          },
        imageInput: imageInput as string,
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
