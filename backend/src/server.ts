//server.ts
import express from "express";
import { configureApp } from "./config/appConfig";
/*
import { setupMiddleware } from "../../utils/route_handlers/appMiddleware";
import { setupDbRoutes } from '../../utils/route_handlers/dbRoutes';
*/
import { startServer } from "./config/serverConfig";

const app = express();

// Configure app settings
configureApp(app);

/*
// Setup middleware
setupMiddleware(app);

// Setup routes that require database access
setupDbRoutes(app);
*/

// Starts angular express application
startServer(app);

export default app;
