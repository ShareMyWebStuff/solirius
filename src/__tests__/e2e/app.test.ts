import request from 'supertest';
import type { Response } from 'supertest';
import { describe, expect, test, beforeAll } from '@jest/globals';
import path from 'path';

import app from '@/app';

interface FileProcessing {
  filename: string;
  expectedStatusCode: number;
  expectedPayload: object;
}

describe('app.ts', () => {
  test('Catch-all route', async () => {
    const res = await request(app).get('/');
    expect(res.body).toEqual({ message: 'This route is not defined.' });
  });

  describe('When we dont specify an upload file', () => {
    let res: Response;
    beforeAll(async () => {
      res = await request(app).post('/upload');
    });
    test('Then we should receive not found status', async () => {
      expect(res.statusCode).toBe(404);
    });

    test('And we should receive no file uploaded payload', async () => {
      expect(res.body).toEqual({ message: 'No file is uploaded. Check the log file.' });
    });
  });

  describe.each<FileProcessing>([
    {
      filename: 'empty-file.csv',
      expectedStatusCode: 200,
      expectedPayload: { details: [], failedRecords: 0, processedRecords: 0, totalRecords: 0 },
    },
    {
      filename: 'only-has-header-record.csv',
      expectedStatusCode: 200,
      expectedPayload: { details: [], failedRecords: 0, processedRecords: 0, totalRecords: 0 },
    },
    {
      filename: 'has-one-valid-record.csv',
      expectedStatusCode: 200,
      expectedPayload: {
        details: [{ email: ' dave@example.com', name: 'Dave Ferguson' }],
        failedRecords: 0,
        processedRecords: 1,
        totalRecords: 1,
      },
    },
    {
      filename: 'has-many-records.csv',
      expectedStatusCode: 200,
      expectedPayload: {
        details: [
          {
            email: 'john@example.com',
            name: 'John Doe',
          },
          {
            email: 'invalid-email',
            name: 'Jane Smith',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe1',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe2',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe3',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe4',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe5',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe6',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe7',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe8',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe9',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe10',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe11',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe12',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe13',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe14',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe15',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe16',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe17',
          },
          {
            email: 'john1@example.com',
            name: 'John Doe18',
          },
        ],
        failedRecords: 1,
        processedRecords: 19,
        totalRecords: 20,
      },
    },
    {
      filename: 'many-invalid-records.csv',
      expectedStatusCode: 200,
      expectedPayload: {
        details: [
          {
            email: 'invalid-email',
            name: 'Jane Smith',
          },
          {
            email: '',
            name: 'John Doe1',
          },
          {
            email: '',
            name: 'John Doe3',
          },
        ],
        failedRecords: 3,
        processedRecords: 0,
        totalRecords: 3,
      },
    },
  ])(`Given we want to upload a file`, ({ filename, expectedStatusCode, expectedPayload }) => {
    describe(`When we upload file ${filename}`, () => {
      let res: Response;
      beforeAll(async () => {
        const filepath = path.join(__dirname, './factories', filename);
        res = await request(app).post('/upload').attach('import-csv', filepath);
      });
      test(`Then we should receive status code (${expectedStatusCode})`, async () => {
        expect(res.statusCode).toBe(expectedStatusCode);
      });

      test('And we should receive the following response', async () => {
        expect(res.body).toEqual(expectedPayload);
      });
    });
  });
});
