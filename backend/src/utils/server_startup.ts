export default {}

import { Application } from "express";
const middleware = require('../utils/route_handlers/appMiddleware');
const database = require('../utils/route_handlers/dbRoutes');
const expressServer = require('../config/serverConfig');
const sessionMiddleware  = require('../config/sessionMiddlewareConfig');
const connection = require('../config/cassandraConnectionCheck');

// Function to initialize and start the server
async function initializeAndStartServer(app: Application) {
    try {
      // Check Cassandra connection
      await connection.check();
  
      // Setup general middleware
      middleware.setUp(app);
  
      // Configure session middleware settings
      sessionMiddleware.configure(app);
  
      // Setup routes that require database access
      database.setupDbRoutes(app);
  
      // Start the server
      expressServer.start(app);
    } catch (error) {
      console.error('Failed to initialize application:', error);
      process.exit(1); // Exit the process if initialization fails
    }
}

module.exports = { initializeAndStartServer } ;