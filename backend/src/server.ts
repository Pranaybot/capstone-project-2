//server.ts
import express from "express";
import { configureApp } from "./config/appConfig";
import { setupMiddleware } from "../src/utils/route_handlers/appMiddleware";
import { setupDbRoutes } from '../src/utils/route_handlers/dbRoutes';
import { startServer } from "./config/serverConfig";
import { configureSessionMiddlware } from "./config/sessionMiddlewareConfig";

const app = express();

//Configure session middleware settings
configureSessionMiddlware(app);

// Configure app settings
configureApp(app);

// Setup general middleware
setupMiddleware(app);

// Setup routes that require database access
setupDbRoutes(app);

// Starts angular express application
startServer(app);

export default app;
