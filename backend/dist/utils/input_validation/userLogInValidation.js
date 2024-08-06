"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = void 0;
const express_validator_1 = require("express-validator");
const validateLogin = () => {
    return [
        (0, express_validator_1.body)('username')
            .isEmail()
            .withMessage('Invalid email format for username'),
        (0, express_validator_1.body)('pwd')
            .notEmpty()
            .withMessage('Password is required'),
    ];
};
exports.validateLogin = validateLogin;
