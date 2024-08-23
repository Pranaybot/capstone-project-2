import { Application } from 'express';
const session = require('express-session');
const { createClient } = require('redis');
const RedisStore = require('connect-redis')(session);

// Initialize client.
const redisClient = await createClient()
  .on('error', (err: any) => console.log('Redis Client Error', err))
  .connect();
;

// Initialize store.
const redisStore = new RedisStore({
  client: redisClient
});

// Initialize session storage.
export function configureSessionMiddlware(app: Application) {

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
    }))
    
    /* Original Session middleware setup
    app.use(session({
        secret: 'a4g_gdfg-$5',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // Set to true if using HTTPS
    }))
    */
}
  
