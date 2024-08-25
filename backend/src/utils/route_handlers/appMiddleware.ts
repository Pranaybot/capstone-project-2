
// appMiddleware.ts
import { Application } from 'express';
const express = require('express');
const cors = require('cors');
const path = require('path');

function setUp(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  
  // Serve static files from Angular build directory
  const angularAppPath = path.join(__dirname, 
    '../../../../angular-express-app/dist/angular-express-app/browser');
  app.use(express.static(angularAppPath));

  // Catch-all route to serve Angular's index.html
  app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: angularAppPath });
  });
  console.log('Angular App Path:', angularAppPath);
}

module.exports = { setUp };
