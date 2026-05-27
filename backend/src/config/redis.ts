import IORedis from 'ioredis';
import dotenv from 'dotenv';

dotenv.config();

let redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  console.error('REDIS_URL is not defined in the environment variables');
  process.exit(1);
}

// Upstash requires TLS. If the URL starts with redis://, upgrade it to rediss://
if (redisUrl.startsWith('redis://') && redisUrl.includes('upstash.io')) {
  redisUrl = redisUrl.replace('redis://', 'rediss://');
}

const redis = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
  enableReadyCheck: false,
});

redis.on('connect', () => {
  console.log('Redis connected');
});

redis.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

export default redis;
