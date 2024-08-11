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

    async get(sid: string): Promise<any> {
      try {
        const result = await new Promise<any>((resolve, reject) => {
          this.client.execute(sessionQueries.SELECT_SESSIONS, [], (err: any, result: any) => { // No bind variables for SELECT_SESSIONS
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          });
        });
    
        if (result.rowLength === 0) {
          return null; // No sessions found
        }
    
        // Find the session with the matching ID
        const session = result.rows.find((row: any) => row.session_id === sid);
        if (!session) {
          return null; // Session ID not found
        }
    
        try {
          return JSON.parse(session.session_data); // Return the parsed session data
        } catch (parseError: any) {
          throw new Error(`Error parsing session data: ${parseError.message}`);
        }
      } catch (err: any) {
        throw new Error(`Error retrieving session: ${err.message}`);
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
  
    async destroy(sessionId: string): Promise<void> {
      try {
        // Wrap the callback-based execute method in a Promise
        await new Promise<void>((resolve, reject) => {
          this.client.execute(sessionQueries.DELETE_SESSION_BY_ID, 
            sessionParams.deleteSessionByIdParams(sessionId), (err: any) => {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          });
        });
      } catch (err: any) {
        throw new Error(`Error deleting session: ${err.message}`);
      }
    }
}
  
export default CassandraStore;