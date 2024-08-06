//server.ts
import express, { Application } from "express";
import { configureApp } from "./config/appConfig";
import { setupMiddleware } from "../src/utils/route_handlers/appMiddleware";
import { setupDbRoutes } from '../src/utils/route_handlers/dbRoutes';
import { startServer } from "./config/serverConfig";
import { configureSessionMiddlware } from "./config/sessionMiddlewareConfig";
import checkConnection from "./config/cassandraConnectionCheck";

const app = express();

// Function to initialize and start the server
async function initializeAndStartServer(app: Application) {
    try {
      // Check Cassandra connection
      await checkConnection();
  
      // Configure app settings
      configureApp(app);
  
      // Setup general middleware
      setupMiddleware(app);
  
      // Configure session middleware settings
      configureSessionMiddlware(app);
  
      // Setup routes that require database access
      setupDbRoutes(app);
  
      // Start the server
      startServer(app);
    } catch (error) {
      console.error('Failed to initialize application:', error);
      process.exit(1); // Exit the process if initialization fails
    }
  }
  
  // Initialize and start the server
  initializeAndStartServer(app);
  
  export default app;