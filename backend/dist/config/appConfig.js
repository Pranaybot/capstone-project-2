"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureApp = configureApp;
const path_1 = __importDefault(require("path"));
function configureApp(app) {
    // Set EJS as the view engine
    app.set('view engine', 'ejs');
    // Specify the directory for EJS views
    app.set('views', path_1.default.join(__dirname, 'forms')); // Adjust the path as per your project structure
}
