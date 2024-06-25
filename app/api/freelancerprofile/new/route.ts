
import { db } from "@/lib/db";

import { NextRequest, NextResponse } from "next/server";



function parseNestedFormData(formdata: FormData, prefix: string) {
  const data: any = [];
  formdata.forEach((value, key) => {
    if (key.startsWith(prefix)) {
      const newKey = key.replace(`${prefix}[`, '').replace(']', '');
      const keys = newKey.split('.');

      keys.reduce((acc, currKey, index) => {
        if (index === keys.length - 1) {
          acc[currKey] = value;
        } else {
          acc[currKey] = acc[currKey] || {};
        }
        return acc[currKey];
      }, data);
    }
  });
  return data;
}


export async function POST(request:NextRequest){
 
 const body = await request.json();
 const {
    userId,
    country,
    name,
    contact,
    hourlyrate,
    estimatedamount,
    message,
    category,
    language,
     imageUrl,
  } = body;

  if(!userId){
    return new Response('No user ID is provided', { status: 400 });
  
  }
  const checkProfile =await db.freelancerProfile.findUnique({
  where:{
    id:userId ,
  }
 })

 if(checkProfile){
  return NextResponse.json({error:"Freelancer profile already exist"},{status:400})

 }
 I see. The error message indicates that there's a mismatch between the structure of the countryData you're creating and what the Prisma schema expects for the Country model. Specifically, it seems that the Country model in your Prisma schema includes a client field that is required, but it's not present in the data you're trying to create.
Let's modify the code to address this issue:
typescriptCopyexport async function POST(request: NextRequest) {
  const body = await request.json();
  const {
    userId,
    country,
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
      id: userId,
    }
  });

  if (checkProfile) {
    return NextResponse.json({ error: "Freelancer profile already exists" }, { status: 400 });
  }

  // Check if country is defined and is an array
  if (!country || !Array.isArray(country)) {
    return NextResponse.json({ error: "Country data is missing or invalid" }, { status: 400 });
  }

  // Check if category is defined and is an array
  if (!category || !Array.isArray(category)) {
    return NextResponse.json({ error: "Category data is missing or invalid" }, { status: 400 });
  }
 try {
   const FreelancerProfile = await db.freelancerProfile.create({
      data: {
        name:name as string,
        contact:contact as string,
        hourlyrate: hourlyrate as string,
        estimatedamount: estimatedamount as string,
        message: message as string,
        language: language as string,
        country: {
          create: country.map((c: any) => ({
            name: c.name || '',
            zip: c.zip || '',
            Statename: c.Statename || '',
            cityname: c.cityname || '',
            address: c.address || '',
            
          }))
        },
        },
        skills: {
          create: category.map((skill: any) => ({
            skill: skill.skill,
            profession: {
              connect: {
                id: skill.professionId,
              },
            },
          })),
        },
        profession: {
          create: category.map((p: any) => ({
            profession: p.profession,
            jobCategory: {
              connect: {
                id: p.categoryId,
              },
            },
          })),
        },
    
        imageInput: imageUrl ,
        user: {
          connect: { id: userId as string},
        },
      },
    });
return NextResponse.json({msg:FreelancerProfile}, { status: 201 });
  
} catch (error) {
  console.error('Error in POST /api/profile/new:', error);
    return NextResponse.json({ error: 'Failed to create freelancer profile' }, { status: 500 });
}


  
}