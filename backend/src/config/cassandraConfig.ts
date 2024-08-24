const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv to load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const contactPoints = [process.env["CASSANDRA_HOST"] || '127.0.0.1'];
const localDataCenter = process.env["CASSANDRA_DATACENTER"] || 'datacenter1';
const keyspace = process.env["CASSANDRA_KEYSPACE"] || 'my_keyspace';
const username = process.env["CASSANDRA_USERNAME"] || '';
const password = process.env["CASSANDRA_PASSWORD"] || '';

const config = {
    contactPoints: contactPoints,
    localDataCenter: localDataCenter,
    keyspace: keyspace,
    credentials: {
        username: username,
        password: password
    }
}
/*
// Define the path where the bundle is located
const bundlePath = path.join(__dirname, 'secure-connect-taskerr-db.zip');

// Parse the JSON string back into an object
const applicationToken = JSON.parse(process.env["ASTRA_DB_APPLICATION_TOKEN_JSON"]!) || '';
const keyspace = process.env["ASTRA_KEYSPACE_NAME"] || '';


// Config object including the path to the local secure connect bundle
const config = {
    cloud: { secureConnectBundle: bundlePath },
    keyspace: keyspace,
    credentials: {
        username: applicationToken["clientId"],
        password: applicationToken["secret"]
    },
    token: applicationToken["token"]
};
*/

module.exports = config;
