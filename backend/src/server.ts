import express from 'express';
import { Request, Response } from 'express';
import * as path from 'path';
import bodyParser from "body-parser";
import fs from "fs";

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.json());
// Serve static files from the Angular build directory
app.use(express.static(path.join(__dirname, '../../angular-express-app/src')));

// All other routes should be handled by Angular
app.get('*', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../angular-express-app/src/index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
