"use server";

const cloudinary = require("cloudinary").v2;
import {fileSizeFormatter} from  "@/lib/multer"
import { FormDataSchema } from "@/Schemas";
import { db } from "@/lib/db";

import * as z from "zod";
import { NextApiRequest } from "next";


interface MulterRequest extends NextApiRequest {
  files: any;
}

export const freelancerProfile = async (values: z.infer<typeof FormDataSchema>,req:NextApiRequest) => {
  const validatedFiled = FormDataSchema.safeParse(values);

  if (!validatedFiled.success) {
    return { error: "Invalid fields" };
  }
    
  
const  {country,street,contact,city,state,zip,hourlyrate,estimatedamount,message,program,profession,language}=validatedFiled.data;

const {userId,experiencefile,educationfile,imageInput}=await req.body;

try {
    if(!experiencefile ||!educationfile||!imageInput){
 return new Response(JSON.stringify("Missing required fields"),{
status:400,
        })
    }
    let fileData ={};
const documentFile=(req as MulterRequest).files;

if(documentFile){

    let uploadedFile;
    //cloudinary
    try{
     uploadedFile = await cloudinary.uploader.upload(documentFile.path, {
        folder: "jagirbank",
        resource_type: "image",
      });

    }catch (error){
        return new Response(JSON.stringify("image couldn't be uploaded"),{
            status:500
        })
    }
    fileData={
      fileName: documentFile.originalname,
      filePath: uploadedFile.secure_url,
      fileType: documentFile.mimetype,
      fileSize: fileSizeFormatter(documentFile.size, 2),
        
    }
}
   await db.freelancerProfile.create({
    data: {
    userId:userId ,
    country,
    street,
    contact,
    city,
    state,
    zip,
    hourlyrate,
    estimatedamount,
    message,
    program,
    profession,
    language,
    experiencefile:fileData as string,
    educationfile:fileData as string,
    imageInput :fileData as string,
    },
  });
    
} catch (error) {
      console.error("Error in POST CREATING PROFILE", error);
    return new Response(JSON.stringify("failed to c Freelncer profile"), {
      status: 500,
    });
}


 
};
