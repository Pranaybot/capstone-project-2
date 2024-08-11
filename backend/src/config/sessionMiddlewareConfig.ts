import { Application } from 'express';
import session from 'express-session';
import CassandraStore from "../cassandra-session-store";
import client from './clientConfig';

export function configureSessionMiddlware(app: Application) {
    const store = new CassandraStore(client); // Create an instance of CassandraStore
    // Session middleware setup
    app.use(session({
        store: store,
        secret: 'a4g_gdfg-$5',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } // Set to true if using HTTPS
    }))
}
  