import { Application } from 'express';
import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

// Initialize client.
const redisClient = await createClient()
  .on('error', err => console.log('Redis Client Error', err))
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
  
