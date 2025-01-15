import { logger } from '@/utils/logger';
import * as fs from 'fs';
import { parse } from 'fast-csv';
// import csv from 'csv-parser';
// import stripBom from 'strip-bom-stream';
// import stripBom from 'strip-bom-stream';

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

  // const fileLoad = fs.createReadStream(filepath).pipe(stripBom()).pipe(csv());

  // return new Promise((resolve, reject) => {
  //   fileLoad.on('data', (eachRow) => {
  //     retStatus.records.details.push(eachRow as RowData);
  //     if (!eachRow.name || !eachRow.email) {
  //       retStatus.success = false;
  //       retStatus.message = 'Not all columns are defined in the file.';
  //     }
  //   });

  //   fileLoad.on('end', () => {
  //     retStatus.records.totalRecords = retStatus.records.details.length;
  //     resolve(retStatus);
  //   });

  //   fileLoad.on('error', (err) => {
  //     logger.error('Error reading the csv file.', err);
  //     reject(retStatus);
  //   });
  // });
};
