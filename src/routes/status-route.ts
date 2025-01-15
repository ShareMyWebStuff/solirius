import express, { type Router } from 'express';
import { statusController } from '@/controllers/status-controller';

export const statusRouter: Router = express.Router();

// Define the status routes
statusRouter.get('/:uploadId', statusController.getUploadStatus);
