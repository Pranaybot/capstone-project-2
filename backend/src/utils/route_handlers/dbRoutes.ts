
// dbRoutes.ts
import { Application } from 'express';
const initializeDatabase = require('../../database/db');
const userRoute = require('../../routes/userRoute');
const listRoute = require('../../routes/listRoute');
const cardRoute = require('../../routes/cardRoute');


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

