const dotenv = require('dotenv');
const path = require('path');
import { downloadBundleIfNeeded } from "../utils/bundleDownloader";

// Configure dotenv to load environment variables from the .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const bundleUrl = process.env["SECURE_CONNECT_BUNDLE_URL"] || '';
const username = process.env["ASTRA_DB_APPLICATION_TOKEN"] || '';
const password = process.env["ASTRA_DB_PASSWORD"] || ''; // Ensure password is included
const keyspace = process.env["ASTRA_KEYSPACE_NAME"] || '';

// Call the function to ensure the bundle is downloaded
downloadBundleIfNeeded(bundleUrl).catch(err => {
    console.error('Error downloading secure connect bundle:', err);
});

const config = {
    cloud: { secureConnectBundle: path.join(__dirname, 'secure-connect-taskerr-db.zip') },
    keyspace: keyspace,
    credentials: {
        username: username,
        password: password
    }
};

export default config;
