"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignup = void 0;
const express_validator_1 = require("express-validator");
const validateSignup = () => {
    return [
        (0, express_validator_1.body)('firstname')
            .notEmpty()
            .withMessage('First name is required'),
        (0, express_validator_1.body)('lastname')
            .notEmpty()
            .withMessage('Last name is required'),
        (0, express_validator_1.body)('username')
            .isEmail()
            .withMessage('Invalid email format for username'),
        (0, express_validator_1.body)('pwd')
            .isLength({ min: 8 })
            .withMessage('Password must be at least 8 characters long'),
    ];
};
exports.validateSignup = validateSignup;
