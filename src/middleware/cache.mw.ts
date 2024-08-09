import { logger, redis } from '@/config';
import type { NextFunction, Request, Response } from 'express';

const getCache = (baseKey: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { url } = req;
    const key = `${baseKey}:${url.slice(1, url.length)}`;
    const cachedResponse = await redis.get(key);
    if (cachedResponse) {
      return res.json(JSON.parse(cachedResponse));
    } else {
      const originalJson = res.json;

      // Override the default res.json method to store the response body in Redis cache
      // and then call the original res.json method
      res.json = (body) => {
        redis.set(key, JSON.stringify(body));
        redis.expire(key, 60 * 10); // 10 minutes
        return originalJson.call(res, body);
      };
    }
    next();
  };
};

const clearCache = (baseKey: string) => {
  return (_req: Request, res: Response, next: NextFunction) => {
    const originalJson = res.json;
    res.json = (body: any) => {
      const stream = redis.scanStream({ match: `${baseKey}:*` });

      stream.on('data', (keys) => {
        if (keys.length) {
          const pipeline = redis.pipeline();
          keys.forEach((key: string) => {
            pipeline.del(key);
          });
          pipeline.exec((err, results) => {
            if (err) {
              logger.error(`Error deleting keys: ${baseKey}:*`, err);
            } else {
              logger.info(`Deleted keys: ${baseKey}:*`);
            }
          });
        }
      });

      stream.on('end', () => {
        console.log('Completed scanning and deleting keys.');
      });

      return originalJson.call(res, body);
    };

    next();
  };
};

export default {
  getCache,
  clearCache,
};
