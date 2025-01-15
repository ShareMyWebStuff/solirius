import multer from 'multer';
import path from 'path';

// Setup multer
// Specify the upload directory and the upload file names
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/');
  },
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

export const multerUpload = multer({ storage });
