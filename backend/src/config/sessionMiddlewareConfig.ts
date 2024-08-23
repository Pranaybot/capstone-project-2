import { Application } from 'express';
const session = require('express-session');
const redis = require('redis');
const client = redis.createClient();
const redisStore = require('connect-redis')(session);


export function configureSessionMiddlware(app: Application) {

    // New Session middleware setup
    app.use(session({
      store: new redisStore({ client: client }),
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
  
