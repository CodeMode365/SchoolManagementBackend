import '@/config';
import express from 'express';
import ApiRoutes from '@/routes';
import cors from 'cors';

import { morganLogger, logger, Swagger } from '@/config';
import { ApiError } from '@/utils';
import { Handler } from '@/helpers';
import { socket } from '@/config';
import { SocketChannelSetup } from '@/socket';
import { rateLimit } from 'express-rate-limit';

import type { CorsOptions } from 'cors';
import type { Request, Response, NextFunction } from 'express';

const PORT = process.env.PORT || 4300;
const allowedOrigins = process.env.CLIENT_URL || '*';
const corsOptions: CorsOptions = {
  origin: allowedOrigins === '*' ? '*' : allowedOrigins.split(','),
  optionsSuccessStatus: 200,
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
  ],
};

const app = express();
const limiter = rateLimit({
  windowMs: 50 * 60 * 1000, //15min
  limit: 6000,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    status: 429,
    error: 'Too many request from this IP, please try again after 15 seconds',
  },
});
const server = socket.initializeSocket(app);
SocketChannelSetup();

app.use(express.json());
app.use(limiter);
app.use(cors(corsOptions));
app.use(morganLogger.dbReqHandler);
app.use(morganLogger.consoleReqHandler);
app.use('/api/docs', Swagger.swaggerUI, Swagger.swaggerDocs);

Handler.routeWrapper(ApiRoutes);
app.use(process.env.BASE_URL!, ApiRoutes);
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  logger.error(err);
  res.status(500).json({ error: `${err}!` });
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'server is up!' });
});
app.get('/health', (req, res) => {
  console.log(req.query);
  res.status(200).json({ message: 'Ok' });
});

app.all('*', (req, res) => {
  return res.status(404).json({ error: 'Route not found!' + process.pid });
});

server.listen(PORT, () => {
  logger.info('hello world');
  logger.info(`App listening on: http://localhost:${PORT}`);
  logger.info(`App listening on: http://localhost:${PORT}/api/docs`);
});
