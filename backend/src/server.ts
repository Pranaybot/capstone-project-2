//server.ts
import express from 'express';
import startServer from './utils/server_startup';

const app = express();
  
// Initialize and start the server
startServer(app);
