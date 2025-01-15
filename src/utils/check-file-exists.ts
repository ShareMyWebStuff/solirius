import type { Request } from 'express';
import * as fs from 'fs';
import path from 'path';
import { logger } from '@/utils/logger';

interface CheckFileExists {
  status: boolean;
  filepath: string | null;
}

/**
 * Retrieves the uploaded file details from the req (express request). Then checks the file has been uploaded to the multer upload
 * directory.
 *
 * @param req
 * @returns     CheckFileExists - status is true if file exists on req and can be found
 */
export const checkFileExists = (req: Request): CheckFileExists => {
  const res: CheckFileExists = {
    status: false,
    filepath: null,
  };

  try {
    // Check res shows uploaded file
    if (req.file === undefined) {
      logger.error(`File not specified in the request structure.`);
      return res;
    }

    // Check the file has been downloaded and send the response
    const filepath = path.join(__dirname, '/../../', req.file.path);
    if (!fs.existsSync(filepath)) {
      logger.error(`File has not been uploaded by multer.`);
      return res;
    }

    res.status = true;
    res.filepath = filepath;
    return res;
  } catch (error) {
    logger.error(`Internal error occurred trying to check if the file has been uploaded.`);
    return res;
  }
};
