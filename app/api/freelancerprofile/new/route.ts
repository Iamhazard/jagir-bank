import { v2 as cloudinary } from "cloudinary";
import { db } from "@/lib/db";
import { fileSizeFormatter, upload } from "@/lib/multer";
import { NextApiRequest, NextApiResponse } from "next";

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
interface CustomNextApiRequest extends NextApiRequest {
  json: () => Promise<any>;
  files?: any;
}

interface MulterRequest extends NextApiRequest {
  files: MulterFile[];
}

export const POST = async (req: CustomNextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const {
        userId,
        country,
        street,
        state,
        city,
        contact,
        zip,
        hourlyrate,
        estimatedamount,
        message,
        program,
        profession,
        language,
        experiencefile,
        educationfile,
        imageInput,
      } = await req.json();

      console.log("req.body:", req.body);
      // Image upload

      upload.fields([
        { name: experiencefile },
        { name: educationfile },
        { name: imageInput },
      ])(req as any, res as any, async function (err) {
        if (err) {
          return new Response(JSON.stringify("No files received."), {
            status: 400,
          });
        }
        console.log("req.body routes:", req.body);

        let fileData = {};

        const documentFile = req.files;
        console.log("req.files routes:", req.files);
        if (!documentFile) {
          return new Response(JSON.stringify({ error: "no_files" }), {
            status: 422,
          });
        } else {
          documentFile.images = (req as MulterRequest).files.map(
            (file) => file.filename
          );
        }

        if (documentFile) {
          let uploadedFile;
          // Cloudinary upload
          try {
            uploadedFile = await cloudinary.uploader.upload(documentFile.path, {
              folder: "jagirbank",
              resource_type: "image",
            });
          } catch (error) {
            console.error("Error uploading image to Cloudinary:", error);
            return new Response(JSON.stringify("image couldn't be uploaded"), {
              status: 500,
            });
          }

          fileData = {
            fileName: documentFile.originalname,
            filePath: uploadedFile.secure_url,
            fileType: documentFile.mimetype,
            fileSize: fileSizeFormatter(documentFile.size, 2),
          };
        }
      });

      // Create a profile
      const FreelancerProfile = await db.freelancerProfile.create({
        data: {
          country: country || null,
          street: street || null,
          city: city || null,
          contact: contact || null,
          state: state || null,
          zip: zip || null,
          hourlyrate: hourlyrate || null,
          estimatedamount: estimatedamount || null,
          message: message || null,
          program: program || null,
          profession: profession || null,
          language: language || null,
          experiencefile: experiencefile
            ? JSON.stringify(experiencefile)
            : null,
          educationfile: (educationfile && educationfile.fileData) || null,
          imageInput: imageInput.fileData,
          user: {
            connect: { id: userId },
          },
        },
      });

      return new Response(JSON.stringify(FreelancerProfile), { status: 201 });
    } catch (error) {
      console.error("Error in POST /api/profile/new:", error);

      return new Response(
        JSON.stringify({ error: "Failed to create freelancer profile" }),
        { status: 500 }
      );
    }
  } else {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
    });
  }
};
