
const cloudinary = require("cloudinary").v2;
import { db } from "@/lib/db";
import {fileSizeFormatter} from  "@/lib/multer"

import { NextApiRequest, NextApiResponse } from "next";


interface MulterRequest extends NextApiRequest {
  files: any;
}

export const POST =async(req:NextApiRequest,res:NextApiResponse)=>{
    
    const  {userId,country,street,contact,city,state,zip,hourlyrate,estimatedamount,message,program,profession,language,experiencefile,educationfile,imageInput}=await req.body;

    //validation
try {
    if(!country || !street || !contact ||!city || !state  ||!zip || ! hourlyrate ||  !estimatedamount || !message || !program ||!profession ||! language ||!experiencefile ||!educationfile||!imageInput){
        return new Response(JSON.stringify("Missing required fields"),{
status:400,
        })
    }
//image upload

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
//create a profile

const FreelancerProfile = await db.freelancerProfile.create({
 data:{
    userId : userId ,
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

 }
})
  return new Response(JSON.stringify(FreelancerProfile), { status: 201 });
} catch (error) {
     console.error("Error in POST /api/profile/new:", error);
    return new Response(JSON.stringify("failed to c Freelncer profile"), {
      status: 500,
    });
    
}
    
}