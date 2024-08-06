import { Application } from 'express';
import session from 'express-session';

export function configureSessionMiddlware(app: Application) {
    // Session middleware setup
    app.use(session({
        secret: 'a4g_gdfg-$5',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // Set to true if using HTTPS
    }))
}
  