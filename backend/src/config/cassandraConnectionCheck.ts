import cassClient from "./clientConfig";

async function check(): Promise<void> {

    try {
        await cassClient.connect();
        console.log('Cassandra connection successful');
    } catch (error) {
        console.error('Cassandra connection failed:', error);
        process.exit(1); // Exit the process if the connection fails
    }
}

export default check;
