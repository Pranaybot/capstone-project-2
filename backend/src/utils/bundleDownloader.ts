const fs = require('fs');
const axios = require('axios');
const path = require('path');

export function downloadBundleIfNeeded(url: string): Promise<void> {
    const bundlePath = path.join(__dirname, 'secure-connect-taskerr-db.zip');

    if (fs.existsSync(bundlePath)) {
        // Return a resolved Promise if the bundle already exists
        return Promise.resolve();
    }

    return axios({
        url,
        method: 'GET',
        responseType: 'stream'
    }).then((response: { data: { pipe: (arg0: any) => void; }; }) => {
        return new Promise((resolve, reject) => {
            const stream = fs.createWriteStream(bundlePath);
            response.data.pipe(stream);

            stream.on('finish', resolve);
            stream.on('error', reject);
        });
    });
}
