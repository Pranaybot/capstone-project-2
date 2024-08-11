
const SELECT_SESSION_BY_ID = `SELECT * FROM sessions WHERE session_id = ? ALLOW FILTERING`;
const DELETE_SESSION_BY_ID = `DELETE FROM sessions WHERE session_id = ?`;
const ADD_SESSION_DATA_BY_ID = `INSERT INTO sessions (session_id, session_data) VALUES (?, ?)`;

export default {
  SELECT_SESSION_BY_ID,
  DELETE_SESSION_BY_ID,
  ADD_SESSION_DATA_BY_ID
};

