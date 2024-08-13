
// dbRoutes.ts
import { Application } from 'express';
import initializeDatabase from '../../database/db';
import userRoute from '../../routes/userRoute';
import listRoute from '../../routes/listRoute';
import cardRoute from '../../routes/cardRoute';

export function setupDbRoutes(app: Application) {
  initializeDatabase()
    .then(() => {
      console.log("Cassandra DB initialized");

      // Register routes that depend on the database
      app.use('/user', userRoute);
      app.use('/list', listRoute);
      app.use('/card', cardRoute);
    })
    .catch((err: any) => {
      console.error("Failed to initialize Cassandra DB", err);
    });
}

