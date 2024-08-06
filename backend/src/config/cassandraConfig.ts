require('dotenv').config({path: "../.env"});

const config = {
    "contactPoints": [process.env.CASSANDRA_HOST],
    "localDataCenter": process.env.CASSANDRA_DATACENTER,
    "keyspace": process.env.CASSANDRA_KEYSPACE,
    "credentials":{
        "username": process.env.CASSANDRA_USERNAME,  // Leave empty if authentication is not enabled
        "password": process.env.CASSANDRA_PASSWORD   // Leave empty if authentication is not enabled
    }
};

export default config;
