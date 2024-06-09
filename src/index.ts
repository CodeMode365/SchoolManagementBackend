import '@/config';
import express from 'express';
import ApiRoutes from '@/routes';
import { morganLogger, logger } from '@/config';
import { ApiError } from '@/utils';
import { Handler } from '@/helpers';
import { socket } from '@/config';
import { SocketChannelSetup } from '@/socket';
import type { Request, Response, NextFunction } from 'express';
import cors, { type CorsOptions } from 'cors';

const PORT = process.env.PORT || 4300;
const allowedOrigins = process.env.CLIENT_URL || '*';
const corsOptions: CorsOptions = {
  origin: allowedOrigins === '*' ? '*' : allowedOrigins.split(','),
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
  ],
};

const app = express();
const server = socket.initializeSocket(app);
SocketChannelSetup();

app.use(express.json());
app.use(cors(corsOptions));
app.use(morganLogger.dbReqHandler);
app.use(morganLogger.consoleReqHandler);

Handler.routeWrapper(ApiRoutes);
app.use(process.env.BASE_URL!, ApiRoutes);
app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({ error: err.message });
  }
  logger.error(err);
  res.status(500).send(`Something broke! \n ${err}!`);
});

app.get('/', (req, res) => {
  res.status(200).json({ message: 'server is up!' });
});

app.all('*', (req, res) => {
  return res.status(404).json({ error: 'Route not found!' });
});

server.listen(PORT, () => {
  logger.info('hello world');
  logger.info(`App listening on: http://localhost:${PORT}`);
});
