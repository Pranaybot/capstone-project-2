import fs from 'fs';
import path from 'path';
import axios from 'axios';

export async function downloadBundleIfNeeded(bundleUrl: string): Promise<void> {
    const bundlePath = path.join(__dirname, 'secure-connect-taskerr-db.zip');

    // Download the secure connect bundle if it's not already present
    if (!fs.existsSync(bundlePath)) {
        const response = await axios({
            url: bundleUrl,
            responseType: 'stream'
        });

        response.data.pipe(fs.createWriteStream(bundlePath));
        console.log('Secure connect bundle downloaded.');
    } else {
        console.log('Secure connect bundle already exists.');
    }
}
