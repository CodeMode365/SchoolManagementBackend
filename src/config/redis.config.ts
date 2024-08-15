/*
import { Redis } from 'ioredis';

const redis = new Redis();

redis.flushall((err, success) => {
  //clear all previous keys from all db in redis
  if (err) {
    console.log(err);
  } else {
    console.log('Cache cleared!');
  }
});

redis.on('connecting', () => {
  console.log('Connecting to Redis...');
});

redis.on('ready', () => {
  console.log('Connected to Redis');
});

redis.on('error', (err: Error) => {
  console.error('Error connecting to Redis:', err);
});

redis.on('end', () => {
  console.log('Disconnected from Redis');
});
export default redis;
*/

import { Redis } from 'ioredis';

const redis = new Redis();
let isRedisConnected = false;
let retryCount = 0; // For optional retry logic

const maxRetryCount = 1; // Maximum retry attempts
const retryDelay = 60 * 1000; // Retry delay in milliseconds

redis.on('connecting', () => {
  console.log('Connecting to Redis...');
});

redis.on('ready', () => {
  console.log('Connected to Redis');
  isRedisConnected = true;
  retryCount = 0; // Reset retry count on successful connection
});

redis.on('error', (err: Error) => {
  console.error('Error connecting to Redis:', err);
  isRedisConnected = false;
  retryCount++;

  if (retryCount <= maxRetryCount) {
    console.log(`Retrying Redis connection in ${retryDelay}ms`);
    setTimeout(() => {
      redis.connect();
    }, retryDelay);
  } else {
    console.error('Maximum retry attempts reached. Redis connection failed.');
  }
});

redis.on('end', () => {
  console.log('Disconnected from Redis');
  isRedisConnected = false;
});

export default {
  redis,
  isRedisConnected,
};
