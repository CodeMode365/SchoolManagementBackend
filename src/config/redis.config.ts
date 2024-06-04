import { Redis } from 'ioredis';

const redis = new Redis();

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
