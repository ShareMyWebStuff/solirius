import { StatusCodes } from 'http-status-codes';
import { database } from '@/database/map-store';
import { ServiceResponse } from '@/utils/service-response';
import { logger } from '@/utils/logger';

interface UploadStatus {
  uploadId: string;
  progress: string;
}

export const getStatusService = (uploadId: string): ServiceResponse<null> | ServiceResponse<UploadStatus> => {
  try {
    // Lookup progress for the upload id
    const progress = database.getUploadProgress(uploadId);

    // If upload id does not exist, respond not found
    if (progress === undefined) {
      return ServiceResponse.setResponse(false, 'Error finding file upload status', null, StatusCodes.NOT_FOUND);
    }

    // Return the found progess
    const payload: UploadStatus = { uploadId, progress };
    return ServiceResponse.setResponse<UploadStatus>(true, 'Upload progress', payload);
  } catch (error) {
    logger.error('Error retrieving the upload status', error);
    return ServiceResponse.setResponse(
      false,
      'Error retrieving file upload progress. Please check log files.',
      null,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};
