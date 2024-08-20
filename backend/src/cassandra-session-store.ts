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

    async get(): Promise<any> {
      try {
        const result = await this.client.execute(sessionQueries.SELECT_SESSIONS, [], { prepare: true });
    
        if (result.rowLength === 0) {
          return {}; // Return an empty object if no sessions are found
        }
    
        const sessions = result.rows.reduce((acc: any, row: any) => {
          acc[row.session_id] = JSON.parse(row.session_data);
          return acc;
        }, {});
    
        return sessions; // Return the JSON object containing all sessions
      } catch (err: any) {
        throw new Error(`Error retrieving sessions: ${err.message}`);
      }
    }
    
    async set(sid: string, session: any, callback: (err?: any) => void) {
      try {
        const sessionData = JSON.stringify(session);
        await this.client.execute(sessionQueries.ADD_SESSION_DATA_BY_ID,
          sessionParams.addSessionDataByIdParams(sid, sessionData), { prepare: true });
        callback(null);
      } catch (err:any) {
        callback(new Error(`Error saving session: ${err.message}`));
      }
    }
  
    async destroy(sid: string, callback?: (err?: any) => void): Promise<void> {
      try {
        await this.client.execute(sessionQueries.DELETE_SESSION, 
          sessionParams.deleteSessionDataByIdParams(sid), { prepare: true });
        if (callback) {
          callback(null); // Call the callback with no error if successful
        }
      } catch (err: any) {
        if (callback) {
          callback(new Error(`Error deleting sessions: ${err.message}`)); // Call the callback with an error if something goes wrong
        }
      }
    }
    
    
}
  
export default CassandraStore;