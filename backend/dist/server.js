"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//server.ts
const express_1 = __importDefault(require("express"));
const appConfig_1 = require("./config/appConfig");
const appMiddleware_1 = require("../src/utils/route_handlers/appMiddleware");
const dbRoutes_1 = require("../src/utils/route_handlers/dbRoutes");
const serverConfig_1 = require("./config/serverConfig");
const sessionMiddlewareConfig_1 = require("./config/sessionMiddlewareConfig");
const app = (0, express_1.default)();
//Configure session middleware settings
(0, sessionMiddlewareConfig_1.configureSessionMiddlware)(app);
// Configure app settings
(0, appConfig_1.configureApp)(app);
// Setup general middleware
(0, appMiddleware_1.setupMiddleware)(app);
// Setup routes that require database access
(0, dbRoutes_1.setupDbRoutes)(app);
// Starts angular express application
(0, serverConfig_1.startServer)(app);
exports.default = app;
