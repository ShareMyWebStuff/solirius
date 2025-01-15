import 'dotenv/config';
import app from './app';
import { logger } from '@/utils/logger';

// Setup the host and post from the .env files
const host: string = process.env.HOST ?? 'localhost';
const port: number = Number(process.env.PORT ?? '8080');

// Start the express server
const server = app.listen(port, (): void => {
  logger.info(`Server running on port http://${host}:${port}`);
});

// Close the express server
const onCloseSignal = (): void => {
  logger.warn(`Request received to terminate application, shutting down.`);
  server.close(() => {
    logger.warn(`Application has been shut down.`);
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on('SIGINT', onCloseSignal);
process.on('SIGTERM', onCloseSignal);
