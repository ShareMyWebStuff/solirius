# Solirius - Email Validation

## Overview

The project below is a coding test for a file upload API with asyncronous email validation.

- Uploads CSV Files
- Validates the email address in the CSV file
- Records the progress as its processing the file
- When the upload is complete a response is returned stating the number of processed records
- Retrieve progress of current uploading files.

The project below has two endpoints.

/upload
This will upload the specified file

/status/:uploadId
This will retrieve the progress from the map store for the csv upload

As well as the automated testing I manually tested. I set the timeout to 10 seconds and uploaded 20 records. I watched 5 at a time being processed and retrieved the status from a seperate connecting.

## Set up

Clone the repository

npm install

Create an .env file in the root with the port number defined
```
PORT=8000
```

## Run Tests

npm run test

All the tests are located in the __tests__ directory under the src folder. I have created e2e tests for the file upload testing and unit tests for the datastore which is just a simple Map store.

## Test Coverage

I havent completed the test coverage but believe I have covered the requirements.

| File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| ---------------------- | ------- | -------- | ------- | ------- | ----------------- |
| All files              | 83.16   | 60.86    | 86.2    | 82.63   |
| src                    | 88.88   | 100      | 50      | 88.88   |
| app.ts                 | 88.88   | 100      | 50      | 88.88   | 23-25             |
| src/config             | 100     | 100      | 100     | 100     |
| multer.ts              | 100     | 100      | 100     | 100     |
| src/controllers        | 67.64   | 40       | 50      | 67.64   |
| status-controller.ts   | 38.46   | 0        | 0       | 38.46   | 8-22              |
| upload-controller.ts   | 85.71   | 66.66    | 100     | 85.71   | 34-38             |
| src/database           | 100     | 100      | 100     | 100     |
| map-store.ts           | 100     | 100      | 100     | 100     |
| src/middleware         | 100     | 100      | 100     | 100     |
| rate-limiter.ts        | 100     | 100      | 100     | 100     |
| request-logger.ts      | 100     | 100      | 100     | 100     |
| src/routes             | 100     | 100      | 100     | 100     |
| status-route.ts        | 100     | 100      | 100     | 100     |
| upload-route.ts        | 100     | 100      | 100     | 100     |
| src/service            | 76.56   | 66.66    | 83.33   | 75      |
| mock-validate-email.ts | 100     | 100      | 100     | 100     |
| process-csv.ts         | 88.46   | 66.66    | 100     | 88      | 17,44-45          |
| read-csv-file.ts       | 76.47   | 66.66    | 80      | 75      | 42-43,53-54       |
| status-service.ts      | 42.85   | 0        | 0       | 38.46   | 12-26             |
| src/utils              | 88.88   | 57.14    | 100     | 88.57   |
| check-file-exists.ts   | 78.94   | 50       | 100     | 77.77   | 34-35,42-43       |
| logger.ts              | 100     | 50       | 100     | 100     | 20-22             |
| service-response.ts    | 100     | 100      | 100     | 100     |
