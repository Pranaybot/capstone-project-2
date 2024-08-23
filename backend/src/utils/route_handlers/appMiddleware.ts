
// appMiddleware.ts
import { Application } from 'express';
const express = require('express');
const cors = require('cors');
const path = require('path');


export function setupMiddleware(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  // Serve static files from the Angular app
  app.use(express.static(path.join(__dirname, 'dist/your-angular-app')));

  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, 'dist/your-angular-app/index.html'));
  });
}
