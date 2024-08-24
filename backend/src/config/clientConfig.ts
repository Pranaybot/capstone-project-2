const cassandra = require('cassandra-driver');
const cassandraConfig = require('../config/cassandraConfig');


const cassClient = new cassandra.Client(cassandraConfig)

export default cassClient;

