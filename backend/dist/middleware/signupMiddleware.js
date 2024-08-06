"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseMiddleware_1 = __importDefault(require("./baseMiddleware"));
const userSignUpValidation_1 = require("../utils/input_validation/userSignUpValidation");
const signupMiddleware = (0, baseMiddleware_1.default)(userSignUpValidation_1.validateSignup);
exports.default = signupMiddleware;
