import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("req.body multer:", req.body);
console.log("req.files multer:", req.files);

    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

const fileSizeFormatter = (bytes:number, decimal:number) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return (
    parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + " " + sizes[index]
  );
};

const fileFilter = (req: any, file:any, cb:any) => {
 
  if (file.mimetype === 'image/png' ||
  file.mimetype === 'image/jpeg' ||
    file.mimetype === "image/jpg" ||
    file.mimetype === 'application/pdf' ||
    file.mimetype === 'application/msword' ||
    file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    cb(null, true); 
  } else {
    cb(null, false); 
  }
};





const upload = multer({
  storage:storage,
  fileFilter:fileFilter
  
});


export  {upload,fileSizeFormatter};