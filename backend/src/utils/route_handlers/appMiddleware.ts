
// appMiddleware.ts
import { Application } from 'express';
import express from 'express';
import cors from 'cors';
import path from 'path';

export function setupMiddleware(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // Serve static files from the Angular app
  app.use(express.static(path.join(__dirname, '../../../angular-express-app/src')));
}
