import { logger } from '@/utils/logger';
import * as fs from 'fs';
import { parse } from 'fast-csv';

type RowData = {
  name: string;
  email: string;
};

export type RecordsProcessed = {
  totalRecords: number;
  processedRecords: number;
  failedRecords: number;
  details: RowData[];
};

type ReadCsvFileRes = {
  success: boolean;
  message: string;
  records: RecordsProcessed;
};

export const readCsvFile = (filepath: string): Promise<ReadCsvFileRes> => {
  const retStatus: ReadCsvFileRes = {
    success: true,
    message: '',
    records: {
      totalRecords: 0,
      processedRecords: 0,
      failedRecords: 0,
      details: [],
    },
  };

  return new Promise((resolve, reject) => {
    fs.createReadStream(filepath)
      .pipe(parse({ headers: true }))
      .on('error', (error) => {
        logger.error('Error reading the csv file.', error);
        reject(retStatus);
      })
      .on('data', (row) => {
        const rowData: RowData = {
          name: row.name,
          email: row.email,
        };

        retStatus.records.details.push(rowData);
        if (row.name === undefined || row.email === undefined) {
          retStatus.success = false;
          retStatus.message = 'Not all columns are defined in the file.';
        }
      })
      .on('end', () => {
        retStatus.records.totalRecords = retStatus.records.details.length;
        resolve(retStatus);
      });
  });

};
