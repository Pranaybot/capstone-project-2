const dotenv = require('dotenv');
const path = require('path');

// Configure dotenv to load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Define the path where the bundle is located
const bundlePath = path.join(__dirname, 'secure-connect-taskerr-db.zip');

const username = process.env["ASTRA_DB_USERNAME"] || '';
const password = process.env["ASTRA_DB_APPLICATION_TOKEN"] || ''; // Ensure password is included
const keyspace = process.env["ASTRA_KEYSPACE_NAME"] || '';

// Config object including the path to the local secure connect bundle
const config = {
    cloud: { secureConnectBundle: bundlePath },
    keyspace: keyspace,
    credentials: {
        username: username,
        password: password
    }
};

export default config;
