import client from "./clientConfig";

async function checkConnection(): Promise<void> {

    try {
        await client.connect();
        console.log('Cassandra connection successful');
    } catch (error) {
        console.error('Cassandra connection failed:', error);
        process.exit(1); // Exit the process if the connection fails
    }
}

export default checkConnection;
