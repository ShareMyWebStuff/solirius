import type { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '@/utils/logger';
import { checkFileExists } from '@/utils/check-file-exists';
import { database } from '@/database/map-store';
import { processCsv } from '@/service/process-csv';

class UploadController {
  public uploadFileAndParse: RequestHandler = async (req: Request, res: Response) => {
    try {
      const fileExists = checkFileExists(req);
      if (!fileExists.status) {
        res.status(StatusCodes.NOT_FOUND).send({ message: 'No file is uploaded. Check the log file.' });
        return;
      }

      // Get the next unique file upload id
      const uploadId = database.getNextUploadId;

      // Respond that we have started the upload.
      logger.info('Started processing file.', {
        uploadId,
        message: 'File uploaded successfully. Processing started.',
      });

      // Parse the CSV file
      logger.info('Process csv file.');
      const serviceResponse = await processCsv(uploadId, fileExists.filepath!);

      // Send the response
      if (serviceResponse.statusCode === StatusCodes.OK) {
        res.status(serviceResponse.statusCode).send(serviceResponse.responseObject);
      } else {
        res.status(serviceResponse.statusCode).send(serviceResponse);
      }
    } catch (error) {
      logger.error('Error uploading the CSV file in the controller', error);
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Error uploading the CSV file. Please check log files.',
      });
    }
  };
}

export const uploadController = new UploadController();
