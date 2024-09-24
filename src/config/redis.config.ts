import { Redis } from 'ioredis';

const redis = new Redis({
  retryStrategy(times) {
    const delay = Math.min(times * 100, 2000);
    return delay;
  },
});

let isRedisConnected = false;
let retryCount = 0;

const maxRetryCount = 1;
const retryDelay = 60 * 1000;

redis.on('connecting', () => {});

redis.on('ready', () => {
  // console.log('Connected to Redis');
  isRedisConnected = true;
  retryCount = 0;
});

redis.on('error', (err: Error) => {
  // console.error('Error connecting to Redis:', err);
  isRedisConnected = false;
  retryCount++;

  if (retryCount <= maxRetryCount) {
    setTimeout(() => {
      redis.connect();
    }, retryDelay);
  } else {
    // console.error('Maximum retry attempts reached. Redis connection failed.');
  }
});

redis.on('end', () => {
  // console.log('Disconnected from Redis');
  isRedisConnected = false;
});

export default {
  redis,
  isRedisConnected,
};
