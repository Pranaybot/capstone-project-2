import { Application } from "express";
const { setupMiddleware } = require('../utils/route_handlers/appMiddleware');
const { setupDbRoutes } = require('../utils/route_handlers/dbRoutes');
const { startServer } = require('../config/serverConfig');
const { configureSessionMiddleware } = require('../config/sessionMiddlewareConfig');
const checkConnection = require('../config/cassandraConnectionCheck');

// Function to initialize and start the server
async function initializeAndStartServer(app: Application) {
    try {
      // Check Cassandra connection
      await checkConnection();
  
      // Setup general middleware
      setupMiddleware(app);
  
      // Configure session middleware settings
      configureSessionMiddleware(app);
  
      // Setup routes that require database access
      setupDbRoutes(app);
  
      // Start the server
      startServer(app);
    } catch (error) {
      console.error('Failed to initialize application:', error);
      process.exit(1); // Exit the process if initialization fails
    }
}

export default initializeAndStartServer;