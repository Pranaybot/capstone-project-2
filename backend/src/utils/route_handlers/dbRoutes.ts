
// dbRoutes.ts
import { Application, Request, Response } from 'express';
import cassandraInitialize from '../../database/db';
import userRoute from '../../routes/userRoute';
import listRoute from '../../routes/listRoute';
import cardRoute from '../../routes/cardRoute';
import path from 'path';

function setupDbRoutes(app: Application) {
  cassandraInitialize()
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

export default setupDbRoutes;
