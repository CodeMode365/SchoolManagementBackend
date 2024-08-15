import { logger, redisClient } from '@/config';
import type { NextFunction, Request, Response } from 'express';

const { redis, isRedisConnected } = redisClient;
const getCache = (baseKey: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!isRedisConnected) next();

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
    if (!isRedisConnected) {
      console.log('Redis is not connected. Skipping cache clearing.');
      return next(); // Continue to the next middleware if Redis is not connected
    }
    // Bind the original res.json function to the current context (res) so that it can be called later
    const originalJson = res.json.bind(res);
    res.json = (body: any) => {
      const stream = redis.scanStream({ match: `${baseKey}:*` });

      stream.on('data', (keys) => {
        if (keys.length) {
          const pipeline = redis.pipeline();
          keys.forEach((key: string) => {
            pipeline.del(key);
          });
          pipeline.exec((err) => {
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
      // Call the original res.json method with the body to send the response
      // After this, the response has been sent, so we can't send any more headers
      // or status codes. The clearCache middleware should be used before any
      // other middleware that may send a response.
      return originalJson(body);
    };

    next(); // Ensure next middleware/route handler is called
  };
};

export default {
  getCache,
  clearCache,
};
