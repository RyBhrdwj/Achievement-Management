const Redis = require('ioredis');
const dotenv = require('dotenv');

dotenv.config();

const redisClient = new Redis({
  port: process.env.REDIS_PORT, // Default is 6379
  host: process.env.REDIS_HOST, // e.g., 'your-redis-instance.onrender.com'
  username: process.env.REDIS_USER, // Required only for certain Redis setups
  password: process.env.REDIS_PASSWORD, // Make sure this is correct
  tls: {} // Use TLS if required by your Redis setup
});

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Test connection with a simple command
redisClient.ping((err, result) => {
  if (err) {
    console.error('Ping error:', err);
  } else {
    console.log('Ping result:', result); // Should return 'PONG'
  }
});

module.exports = redisClient;
