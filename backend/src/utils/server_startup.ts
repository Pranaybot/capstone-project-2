import { Application } from "express";
import middlewareSetup from '../utils/route_handlers/appMiddleware';
import databaseRoutesSetup from '../utils/route_handlers/dbRoutes';
import expressServerStart from '../config/serverConfig';
import checkConnection from '../config/cassandraConnectionCheck';
import sessionMiddlewareConfigure from '../config/sessionMiddlewareConfig';

// Function to initialize and start the server
async function initializeAndStartServer(app: Application) {
    try {
      // Check Cassandra connection
      await checkConnection();
  
      // Setup general middleware
      middlewareSetup(app);
  
      // Setup routes that require database access
      databaseRoutesSetup(app);

      // Configure session middleware settings
      sessionMiddlewareConfigure(app);
  
      // Start the server
      expressServerStart(app);
    } catch (error) {
      console.error('Failed to initialize application:', error);
      process.exit(1); // Exit the process if initialization fails
    }
}

export default initializeAndStartServer;
