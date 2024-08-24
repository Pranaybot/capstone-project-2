
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
app.use(express.static(path.join(__dirname, '../../../angular-express-app/dist/angular-express-app/browser')));

// Define a catch-all route to serve the Angular application
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../../angular-express-app/dist/angular-express-app/browser/index.html'));
});
}

module.exports = { setUp };
