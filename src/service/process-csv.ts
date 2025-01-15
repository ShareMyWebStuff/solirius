import { StatusCodes } from 'http-status-codes';
import { ServiceResponse } from '@/utils/service-response';
import { logger } from '@/utils/logger';
import { database } from '@/database/map-store';
import { readCsvFile } from './read-csv-file';
import type { RecordsProcessed } from './read-csv-file';
import { mockValidateEmail } from './mock-validate-email';
import pLimit from 'p-limit';

export const processCsv = async (uploadId: string, filepath: string) => {
  try {
    logger.info(`Upload Id - ${uploadId}`);
    const limit = pLimit(5);

    const readRes = await readCsvFile(filepath);
    if (!readRes.success) {
      return ServiceResponse.setResponse(false, readRes.message, null, StatusCodes.CONFLICT);
    }

    // Creates a status row in the Map data store
    database.updateUploadStatus(uploadId, readRes.records.totalRecords, 0);

    // Validate the emails
    await Promise.all(
      readRes.records.details.map((row) =>
        limit(async () => {
          const { valid } = await mockValidateEmail(row.email);
          if (valid) {
            readRes.records.processedRecords++;
          } else {
            readRes.records.failedRecords++;
          }
          database.updateUploadStatus(
            uploadId,
            readRes.records.totalRecords,
            readRes.records.processedRecords + readRes.records.failedRecords,
          );
        }),
      ),
    );

    return ServiceResponse.setResponse<RecordsProcessed>(true, 'Upload progress', readRes.records);
  } catch (error) {
    logger.error('Error processing the csv file', error);
    return ServiceResponse.setResponse(
      false,
      'Error processing the csv file. Please check log files.',
      null,
      StatusCodes.INTERNAL_SERVER_ERROR,
    );
  }
};
