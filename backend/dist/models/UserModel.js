"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserTableQuery = void 0;
exports.createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY,
    firstName text,
    lastName text,
    userId text,
    password text
  )
`;
