"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseMiddleware_1 = __importDefault(require("./baseMiddleware"));
const userLogInValidation_1 = require("../utils/input_validation/userLogInValidation");
const loginMiddleware = (0, baseMiddleware_1.default)(userLogInValidation_1.validateLogin);
exports.default = loginMiddleware;
