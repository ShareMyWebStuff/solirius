import type { Request, Response, NextFunction } from 'express';
import { logger } from '@/utils/logger';

/**
 * Middleware that is used to logs each request the express server receives
 * @param req
 * @param res
 * @param next
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  logger.info(`Request Logger  - ${req.method} ${req.path}`);
  next();
};
