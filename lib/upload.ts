import cloudinary from "./cloudinary";


const uploadToCloudinary = async(
  file: File, folder: string) => {

     if (!file || !(file instanceof File)) {
    throw new Error("Invalid file input. The file should be a valid File object.");
  }

  try {
   
const buffer= await file.arrayBuffer();
     console.log("Array buffer",buffer)
    const bytes=Buffer.from(buffer)
    console.log("Uploading to Cloudinary:", { name: file.name, size: file.size, type: file.type });

    console.log("bytes from arrray buffer",bytes)
  return new Promise(async(resolve, reject) => {
   await cloudinary.uploader.upload_stream({
        resource_type:"auto",
        folder:folder,
      },async (err,result)=>{
        if(err){
          return reject(err.message)
        }
       return resolve(result)
      }).end(bytes)
    
  })
    
    
  } catch (error:any) {
throw new Error(`Failed to upload file: ${error.message}`);
  }

     
};

export  default uploadToCloudinary;