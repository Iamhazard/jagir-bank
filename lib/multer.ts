import type { NextApiRequest, NextApiResponse } from 'next';
import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';

interface NextApiRequestWithFiles extends NextApiRequest {
  files: {
    [fieldname: string]: Express.Multer.File[];
  };
}

// Middleware to run multer
const runMiddleware = (req: NextApiRequestWithFiles, res: NextApiResponse, fn: any) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(process.cwd(), 'uploads');
    // Ensure the directory exists
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req: any, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'application/pdf'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter }).fields([
  { name: 'experiencefile', maxCount: 1 },
  { name: 'educationfile', maxCount: 1 },
  { name: 'imageInput', maxCount: 1 }
]);

const fileSizeFormatter = (bytes: number, decimal: number) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = decimal < 0 ? 0 : decimal;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
  const index = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, index)).toFixed(dm)) + ' ' + sizes[index];
};

export { upload, fileSizeFormatter, runMiddleware };
