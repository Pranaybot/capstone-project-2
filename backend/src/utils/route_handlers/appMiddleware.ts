
// appMiddleware.ts
import { Application, Request, Response } from 'express';
const express = require('express');
const cors = require('cors');
const path = require('path');

function setUp(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  app.use(express.static(path.join(__dirname, 
    '../../../angular-dist/angular-express-app/browser')));

  app.get('*', (_req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 
      '../../../angular-dist/angular-express-app/browser/browser/index.html'))
  });
}

module.exports = { setUp };
