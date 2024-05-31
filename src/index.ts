import '@/config';
import { morganLogger, logger } from '@/config';
import ApiRoutes from '@/routes';
import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import { ApiError } from '@/utils';
import { Handler } from '@/helpers';

const PORT = process.env.PORT || 4300;
const app = express();

app.use(express.json());
app.use(morganLogger.dbReqHandler);
app.use(morganLogger.consoleReqHandler);

Handler.routeWrapper(ApiRoutes);
app.use('/api/v1', ApiRoutes);
app.use((err: any, req: Request, res: Response) => {
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

app.listen(PORT, () => {
  logger.info('hello world');
  logger.info(`App listening on: http://localhost:${PORT}`);
});
