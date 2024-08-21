const dotenv = require('dotenv');
const path = require('path');
import { downloadBundleIfNeeded } from "../utils/bundleDownloader";

// Configure dotenv to load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const bundleUrl = process.env["SECURE_CONNECT_BUNDLE_URL"] || '';
const username = process.env["ASTRA_DB_APPLICATION_TOKEN"] || '';
const password = process.env["ASTRA_DB_PASSWORD"] || ''; // Ensure password is included
const keyspace = process.env["ASTRA_KEYSPACE_NAME"] || '';
const clientId = process.env["ASTRA_CLIENT_ID"] || '';
const clientSecret = process.env["ASTRA_CLIENT_SECRET"] || '';

// Call the function to ensure the bundle is downloaded
downloadBundleIfNeeded(bundleUrl).catch(err => {
    console.error('Error downloading secure connect bundle:', err);
});

// Define the path where the bundle should be saved
const bundlePath = path.join(__dirname, 'secure-connect-taskerr-db.zip');

const config = {
    cloud: { secureConnectBundle: bundlePath },
    keyspace: keyspace,
    clientId: clientId,
    clientSecret: clientSecret,
    credentials: {
        username: username,
        password: password
    }
};

export default config;
