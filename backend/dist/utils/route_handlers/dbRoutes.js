"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupDbRoutes = setupDbRoutes;
const db_1 = __importDefault(require("../../database/db"));
const userRoute_1 = __importDefault(require("../../routes/userRoute"));
//import listRoute from '../../routes/listRoute';
function setupDbRoutes(app) {
    (0, db_1.default)()
        .then(() => {
        console.log("Cassandra DB initialized");
        // Register routes that depend on the database
        app.use('/user', userRoute_1.default);
        // app.use('/list', listRoute);
    })
        .catch((err) => {
        console.error("Failed to initialize Cassandra DB", err);
    });
}
