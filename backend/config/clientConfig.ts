import casssandra from "cassandra-driver";
const { config } = require("../config/cassandraConfig");

const client = new casssandra.Client(config)

export default client;
