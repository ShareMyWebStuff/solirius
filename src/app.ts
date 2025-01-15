import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';
import { logger } from '@/utils/logger';
import { uploadRouter } from '@/routes/upload-route';
import { statusRouter } from '@/routes/status-route';
import { requestLogger } from '@/middleware/request-logger';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
const corsOrigin = process.env.CORS_ORIGIN ?? 'http://localhost';
app.use(cors({ origin: corsOrigin, credentials: true }));

app.use(requestLogger);

// Simple html test screen
app.get('/dashboard', (req, res) => {
  const filepath = path.join(__dirname, '/index.html');
  logger.info(filepath);
  res.sendFile(filepath);
});

// Routes
app.use('/upload', uploadRouter);
app.use('/status', statusRouter);

// Catch all - if the route has not been defined
app.use('/', (req, res) => {
  const message = 'This route is not defined.';
  logger.error(message);
  res.json({ message });
});

export default app;
