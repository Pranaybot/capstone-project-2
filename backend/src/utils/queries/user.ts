const SELECT_USER_BY_USERNAME = `SELECT * FROM users WHERE userId = ? ALLOW FILTERING`;
const SELECT_USER_BY_PASSWORD = `SELECT * FROM users WHERE password = ? ALLOW FILTERING`;
const INSERT_USER = `INSERT INTO users (id, firstName, lastName, userId, password) VALUES (?, ?, ?, ?, ?)`;
const UPDATE_USER_PASSWORD = `UPDATE users SET password = ? WHERE id = ?`;

export default {
  SELECT_USER_BY_USERNAME,
  SELECT_USER_BY_PASSWORD,
  INSERT_USER,
  UPDATE_USER_PASSWORD
};

