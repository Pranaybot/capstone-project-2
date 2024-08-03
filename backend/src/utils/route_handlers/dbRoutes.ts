
// dbRoutes.ts
import { Application } from 'express';
import initializeDatabase from '../../database/db';
import userRoute from '../../routes/userRoute';
//import listRoute from '../../routes/listRoute';

export function setupDbRoutes(app: Application) {
  initializeDatabase()
    .then(() => {
      console.log("Cassandra DB initialized");

      // Register routes that depend on the database
      app.use('/user', userRoute);
      // app.use('/list', listRoute);
    })
    .catch((err: any) => {
      console.error("Failed to initialize cassankub", err);
    });
}

