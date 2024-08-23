//server.ts
const express = require('express')
const initializeAndStartServer = require('./utils/server_startup');

const app = express();
  
// Initialize and start the server
initializeAndStartServer(app);
  