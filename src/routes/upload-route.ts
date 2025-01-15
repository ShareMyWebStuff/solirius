import express, { type Router } from 'express';
import { multerUpload } from '@/config/multer';
import { uploadController } from '@/controllers/upload-controller';
import { uploadLimiter } from '@/middleware/rate-limiter';

export const uploadRouter: Router = express.Router();

// Set the upload routes
uploadRouter.post('/', [uploadLimiter, multerUpload.single('import-csv')], uploadController.uploadFileAndParse);
