import type { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { logger } from '@/utils/logger';
import { getStatusService } from '@/service/status-service';

class StatusController {
  public getUploadStatus: RequestHandler = (req: Request, res: Response) => {
    try {
      // Retrieve the progress status
      const uploadId = req.params.uploadId;
      const serviceResponse = getStatusService(uploadId);

      // Send the response
      if (serviceResponse.statusCode === StatusCodes.OK) {
        res.status(serviceResponse.statusCode as number).send(serviceResponse.responseObject);
      } else {
        res.status(serviceResponse.statusCode).send(serviceResponse);
      }
    } catch (error) {
      logger.error('Error retrieving the upload status from controller', error);

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
        message: 'Error retrieving file upload progress. Please check log files.',
      });
    }
  };
}

export const statusController = new StatusController();
