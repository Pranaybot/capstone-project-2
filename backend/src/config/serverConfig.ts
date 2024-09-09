// startServer.ts
import { Application } from 'express';

function start(app: Application) {
  const port = process.env['PORT'] || 3000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default start;

