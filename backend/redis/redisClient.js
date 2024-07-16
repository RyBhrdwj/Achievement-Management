const Redis = require('ioredis');
const redisClient = new Redis();

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

module.exports = redisClient;
