import cassandra from 'cassandra-driver';
import cassandraConfig from '../config/cassandraConfig';


const cassClient = new cassandra.Client(cassandraConfig)

export default cassClient;

