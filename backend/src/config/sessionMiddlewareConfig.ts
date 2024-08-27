import { Application } from 'express';
import RedisStore from "connect-redis";
const session = require('express-session');
const { createClient } = require('redis');

// Function to initialize Redis client and store
function initializeRedisStore() {
  // Initialize Redis client with options suitable for production
  const redisClient = createClient({
    password: process.env["REDIS_PASSWORD"],
    socket: {
        host: process.env["REDIS_HOST"],
        port: process.env["REDIS_PORT"]
    }
});


  redisClient.connect().catch((error: any) => {
    console.error('Redis connection error:', error);
    process.exit(1); // Exit the process if Redis connection fails in production
  });

  // Initialize Redis store
  const redisStore = new RedisStore({
    client: redisClient,
    ttl: 60 * 10, // Set time to live for sessions (10 minutes)
  });

  return redisStore;
}

// Initialize session storage
function configure(app: Application) {
  const redisStore = initializeRedisStore();

  // Session middleware setup with environment-based configuration
  app.use(session({
    store: redisStore,
    secret: process.env['REDIS_SESSION_SECRET'], // Use environment variable for session secret
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: 'strict', // Consider using 'strict' for better security
      secure: process.env['REDIS_NODE_ENV'] === 'production', // Only set secure cookies in production
      httpOnly: true, // Prevent JavaScript access to cookies
      maxAge: 1000 * 60 * 10 // 10 minutes
    }
  }));
}

module.exports = { configure };
