import session from 'express-session';
import { Client } from 'cassandra-driver';
import sessionQueries from "./utils/queries/sessonStore";
import sessionParams from "./utils/params/sessionStoreParams";

// Custom session store for Cassandra
class CassandraStore extends session.Store {

    private client: Client;

    constructor(client: Client) {
      super();
      this.client = client;
    }

    async get(sid: string, callback: (err: any, session?: any) => void) {
      try {
        const result = await this.client.execute(sessionQueries.SELECT_SESSION_BY_ID,
          sessionParams.selectOrDeleteSessionByIdParams(sid));
        if (result.rowLength === 0) {
          return callback(null, null);
        }
        const sessionData = result.first();
        callback(null, JSON.parse(sessionData.session_data));
      } catch (err) {
        callback(err);
      }
    }
  
    async set(sid: string, session: any, callback: (err: any) => void) {
      try {
        const sessionData = JSON.stringify(session);
        await this.client.execute(sessionQueries.ADD_SESSION_DATA_BY_ID,
          sessionParams.addSessionDataByIdParams(sid, sessionData), { prepare: true });
        callback(null);
      } catch (err) {
        callback(err);
      }
    }
  
    async destroy(sid: string, callback: (err: any) => void) {
      try {
        await this.client.execute(sessionQueries.DELETE_SESSION_BY_ID, 
          sessionParams.selectOrDeleteSessionByIdParams(sid));
        callback(null);
      } catch (err) {
        callback(err);
      }
    }
}
  
export default CassandraStore;