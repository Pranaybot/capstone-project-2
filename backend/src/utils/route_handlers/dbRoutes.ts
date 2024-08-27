
// dbRoutes.ts
import { Application, Request, Response } from 'express';
const cassandraDb = require('../../database/db');
const userRoute = require('../../routes/userRoute');
const listRoute = require('../../routes/listRoute');
const cardRoute = require('../../routes/cardRoute');
const path = require('path');

function setupDbRoutes(app: Application) {
  cassandraDb.initialize()
    .then(() => {
      console.log("Cassandra DB initialized");

      // Register routes that depend on the database
      app.use('/user', userRoute);
      app.use('/list', listRoute);
      app.use('/card', cardRoute);

      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.join(__dirname, 
          '../../../angular-dist/angular-express-app/browser/browser/index.html'))
      });
    
    })
    .catch((err: any) => {
      console.error("Failed to initialize Cassandra DB", err);
    });
}

module.exports = { setupDbRoutes };
