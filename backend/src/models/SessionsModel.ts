// Define the schema for the sessions table
export const createSessionsTableQuery = `
  CREATE TABLE IF NOT EXISTS sessions (
    session_id text PRIMARY KEY,
    session_data text
  )
`;
