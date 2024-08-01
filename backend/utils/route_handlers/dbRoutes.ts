// DbRoutes.ts
import { Application } from 'express';
import userRoute from '../../routes/userRoute';
import listRoute from '../../routes/listRoute';

export function setupDbRoutes(app: Application) {
  app.use('/user', userRoute);
  app.use('/list', listRoute);
}
