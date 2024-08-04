import { Application } from 'express';
import session from 'express-session';

export function configureSessionMiddlware(app: Application) {
    // Session middleware setup
    app.use(session({
        secret: 'your_secret_key',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false } // Set to true if using HTTPS
    }));
}
  