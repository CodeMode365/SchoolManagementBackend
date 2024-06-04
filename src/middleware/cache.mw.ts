import { redis } from '@/config';
import type { NextFunction, Request, Response } from 'express';

const cacheMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { originalUrl, method } = req;
  const key = `${method}:${originalUrl}`;
  const cachedResponse = await redis.get(key);
  if (cachedResponse) {
    return res.json(JSON.parse(cachedResponse));
  } else {
    const originalSend = res.send;
    const originalJson = res.json;

    // Override the default res.json method to store the response body in Redis cache
    // and then call the original res.json method
    res.json = (body) => {
      redis.set(key, JSON.stringify(body));
      redis.expire(key, 60 * 10); //10 minutes
      return originalJson.call(res, body);
    };

    // Override the default res.send method to store the response body in Redis cache
    // and then call the original res.send method
    res.send = (body) => {
      redis.set(key, body);
      redis.expire(key, 60 * 10); //10 minutes
      return originalSend.call(res, body);
    };
  }
  next();
};

export default cacheMiddleware;
