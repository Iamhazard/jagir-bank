
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const multerMiddleware = upload.fields([
  { name: 'experiencefile', maxCount: 1 },
  { name: 'educationfile', maxCount: 1 },
  { name: 'imageInput', maxCount: 1 },
]);

export default multerMiddleware;
