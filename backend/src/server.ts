//server.ts
import express from 'express';
import initializeAndStartServer from "./utils/server_startup"

const app = express();
  
// Initialize and start the server
initializeAndStartServer(app);
  