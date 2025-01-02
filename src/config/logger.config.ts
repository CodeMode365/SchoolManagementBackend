import { format, createLogger, transports, Logger } from 'winston';
import path from 'path';
import vars from '@/config/vars.config';
import moment from 'moment';

const { timestamp, combine, printf, errors, prettyPrint } = format;

const devLogger = () => {
  const logFormat = printf(({ level, message, timestamp, stack }) => {
    const log = `${timestamp} ${level}: ${stack || message}`;
    // console.log(log);
    return log;
  });
  return createLogger({
    level: 'debug',
    format: combine(
      format.colorize(),
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [
      // new transports.Console(),
      new transports.File({
        filename: path.join(
          __dirname,
          '../../logs/',
          moment().format('YYYY-MM-DD')
        ),
      }),
      // new transports.File({
      //   filename: path.join(__dirname, '../../', 'logs', 'error.log'),
      //   level: 'error',
      // }),
      // new transports.File({
      //   filename: path.join(__dirname, '../../', 'logs', 'warn.log'),
      //   level: 'warn',
      // }),
      // new transports.File({
      //   filename: path.join(__dirname, '../../', 'logs', 'combined.log'),
      // }),
    ],
  });
};

const prodLogger = () => {
  return createLogger({
    level: 'info',
    format: combine(timestamp(), errors({ stack: true }), prettyPrint()),
    // defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
      new transports.File({
        filename: path.join(__dirname, '../../', 'logs', 'error.log'),
        level: 'error',
      }),
      new transports.File({
        filename: path.join(__dirname, '../../', 'logs', 'combined.log'),
      }),
    ],
  });
};

let logger: Logger;
if (vars.env === 'production') {
  logger = prodLogger();
} else {
  logger = devLogger();
}

export default logger;
