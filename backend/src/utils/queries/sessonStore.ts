
const SELECT_SESSIONS = `SELECT * FROM sessions ALLOW FILTERING`; // No bind variables
const DELETE_SESSION = `TRUNCATE sessions`;
const ADD_SESSION_DATA_BY_ID = `INSERT INTO sessions (session_id, session_data) VALUES (?, ?)`;

export default {
  SELECT_SESSIONS,
  DELETE_SESSION,
  ADD_SESSION_DATA_BY_ID
};

