import { Application } from 'express';
import RedisStore from "connect-redis";
const session = require('express-session');
const { createClient } = require('redis');

// Function to initialize Redis client and store
function initializeRedisStore() {
  // Initialize client
  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  // Initialize store
  const redisStore = new RedisStore({
    client: redisClient
  });

  return redisStore;
}

// Initialize session storage
function configure(app: Application) {
  const redisStore = initializeRedisStore();

  // New Session middleware setup
  app.use(session({
    store: redisStore,
    secret: 'topsecret~!@#$%^&*',
    resave: false,
    saveUninitialized: false,
    cookie: {
      sameSite: true,
      secure: false,
      httpOnly: false,
      maxAge: 1000 * 60 * 10 // 10 minutes
    }
  }));
  
}

module.exports = { configure };
