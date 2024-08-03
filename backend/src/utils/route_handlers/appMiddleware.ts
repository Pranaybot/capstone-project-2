
// appMiddleware.ts
import { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import path from 'path';

export function setupMiddleware(app: Application) {
  app.use(bodyParser.json());
  app.use(cors());

  // Serve static files from the Angular app
  app.use(express.static(path.join(__dirname, '../../../angular-express-app/src')));
}
