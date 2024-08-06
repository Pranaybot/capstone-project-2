// startServer.ts
import { Application } from 'express';

export function startServer(app: Application) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

