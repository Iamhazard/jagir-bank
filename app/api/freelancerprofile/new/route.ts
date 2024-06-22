import { v2 as cloudinary } from 'cloudinary';
import { db } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';
import multer from 'multer';
import { Readable } from 'stream';
import { fileSizeFormatter, upload } from '@/lib/multer'; // Adjust this import based on your actual implementation
import { error } from 'console';
interface MulterFile {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  size: number;
  destination: string;
  filename: string;
  path: string;
  buffer: Buffer;
}
interface CustomNextApiRequest extends NextRequest {
  json: () => Promise<any>;
  files?: any;
}

interface MulterRequest extends NextRequest {
  files: MulterFile[];
}

// Configure Cloudinary
cloudinary.config({ 
  cloud_name: 'dmsko6djw', 
  api_key: '592257523636176', 
  api_secret: 'iG5wrVWoEpkUSFntp2_ZagUKLJ8' 
});



const runMiddleware = (req: any, res: any, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const uploadFileToCloudinary = async (file: Express.Multer.File): Promise<string | null> => {
  try {
    const stream = new Readable();
    stream.push(file.buffer);
    stream.push(null);

    const result = await new Promise((resolve, reject) => {
      const cloudinaryStream = cloudinary.uploader.upload_stream(
        { folder: 'jagirbank', resource_type: 'image' },
        (error, result) => {
          if (result) {
            resolve(result.secure_url);
          } else {
            reject(error);
          }
        }
      );
      stream.pipe(cloudinaryStream);
    });

    return result as string;
  } catch (error) {
    console.error('Error uploading file to Cloudinary:', error);
    return null;
  }
};

export const POST = async (req: CustomNextApiRequest, res: NextResponse) => {
  await runMiddleware(req, res, upload.fields([
    { name: 'imageInput', maxCount: 1 },
    { name: 'educationfile', maxCount: 1 },
    { name: 'experiencefile', maxCount: 1 },
  ]));


  const {
    userId,
    country,
    name,
    contact,
    hourlyrate,
    estimatedamount,
    message,
    skills,
    profession,
    language,
     imageInput, educationfile, experiencefile
  } = await req.json();

 const checkProfile =await db.freelancerProfile.findUnique({
  where:{
    id:userId,
  }
 })

 if(checkProfile){
  return NextResponse.json({error:"Freelancer profile already exist"},{status:400})

 }

  const imageUpload = imageInput ? await uploadFileToCloudinary(imageInput[0]) : null;
  const educationUpload = educationfile ? await uploadFileToCloudinary(educationfile[0]) : null;
  const experienceUpload = experiencefile ? await uploadFileToCloudinary(experiencefile[0]) : null;

  try {
    const FreelancerProfile = await db.freelancerProfile.create({
      data: {
        userId,
        name,
        contact,
        hourlyrate: hourlyrate || null,
        estimatedamount: estimatedamount || null,
        message: message || null,
        language: language || null,
        country: {
          create: country.map((c: any) => ({
            name: c.name,
            zip: c.zip,
            Statename: c.Statename,
            cityname: c.cityname,
            address: c.address,
          })),
        },
        skills: {
          create: skills.map((skill: any) => ({
            skill: skill.skill,
            profession: {
              connect: {
                id: skill.professionId,
              },
            },
          })),
        },
        profession: {
          create: profession.map((p: any) => ({
            profession: p.profession,
            jobCategory: {
              connect: {
                id: p.categoryId,
              },
            },
          })),
        },
        experiencefile: experienceUpload,
        educationfile: educationUpload,
        imageInput: imageUpload,
        user: {
          connect: { id: userId },
        },
      },
    });

    return NextResponse.json(FreelancerProfile, { status: 201 });
  } catch (error) {
    console.error('Error in POST /api/profile/new:', error);
    return NextResponse.json({ error: 'Failed to create freelancer profile' }, { status: 500 });
  }
};

export const config = {
  api: {
    bodyParser: false,
  },
};
