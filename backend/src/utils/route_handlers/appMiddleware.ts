
// appMiddleware.ts
import { Application } from 'express';
const express = require('express');
const cors = require('cors');

function setUp(app: Application) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
}

module.exports = { setUp };
