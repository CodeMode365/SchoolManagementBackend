import morgan from 'morgan';
import logger from './logger.config';
import { ApiLog } from '@/models';
import type { Request, Response } from 'express';

interface CustomResponse extends Response {
  message?: string;
}

morgan.token('message', (_req: Request, res: CustomResponse) => {
  if (res.headersSent) {
    return '';
  }
  return res.message || '';
});

const dbFormat = JSON.stringify({
  method: ':method',
  url: ':url',
  ip: ':remote-addr',
  status: ':status',
  userAgent: ':user-agent',
  contentLength: ':res[content-length]',
  responseTime: ':response-time',
});

const consoleFormat =
  ':method :url :status :response-time ms - :remote-addr - :user-agent';

const parseLogData = (message: string) => {
  const { method, url, ip, status, userAgent, contentLength, responseTime } =
    JSON.parse(message);

  return {
    method,
    url,
    ip,
    userAgent,
    status,
    contentLength,
    responseTime: parseFloat(responseTime).toFixed(2),
  };
};

const writeStream = (message: string) => {
  const logData = parseLogData(message);
  const log = new ApiLog(logData);
  log.save().catch((error) => logger.error(error));
};

const dbReqHandler = morgan(dbFormat, {
  stream: {
    write: (message) => {
      writeStream(message);
    },
  },
});

const consoleReqHandler = morgan(consoleFormat, {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    },
  },
});

export default { dbReqHandler, consoleReqHandler };
