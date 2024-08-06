"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require('dotenv');
const path = require('path');
// Configure dotenv to load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });
const contactPoints = process.env.CASSANDRA_HOST ? [process.env.CASSANDRA_HOST] : [];
const localDataCenter = process.env.CASSANDRA_DATACENTER || '';
const keyspace = process.env.CASSANDRA_KEYSPACE || '';
const username = process.env.CASSANDRA_USERNAME || '';
const password = process.env.CASSANDRA_PASSWORD || '';
const config = {
    contactPoints: contactPoints,
    localDataCenter: localDataCenter,
    keyspace: keyspace,
    credentials: {
        username: username,
        password: password
    }
};
exports.default = config;
