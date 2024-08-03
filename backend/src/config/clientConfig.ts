
import casssandra from "cassandra-driver";
import config  from "../config/cassandraConfig";

const client = new casssandra.Client(config)

export default client;

