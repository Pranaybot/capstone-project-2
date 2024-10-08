"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SELECT_USER_BY_ID = 'SELECT * FROM users WHERE id = ?';
const SELECT_USER_BY_USERNAME = 'SELECT * FROM users WHERE username = ?';
const INSERT_USER = 'INSERT INTO users (id, firstName, lastName, userId, password) VALUES (?, ?, ?, ?, ?)';
exports.default = {
    SELECT_USER_BY_ID,
    SELECT_USER_BY_USERNAME,
    INSERT_USER,
};
