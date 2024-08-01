// appConfig.ts
import { Application } from 'express';
import path from 'path';

export function configureApp(app: Application) {
  // Set EJS as the view engine
  app.set('view engine', 'ejs');

  // Specify the directory for EJS views
  app.set('views', path.join(__dirname, 'forms')); // Adjust the path as per your project structure
}
