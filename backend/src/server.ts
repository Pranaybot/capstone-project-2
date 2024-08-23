//server.ts
const express = require('express')
const server = require('./utils/server_startup');

const app = express();
  
// Initialize and start the server
server.initializeAndStartServer(app);
