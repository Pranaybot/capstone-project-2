const cassandra = require('cassandra-driver');
const config = require('../config/cassandraConfig');


const client = new cassandra.Client(config)

export default client;

