
const SELECT_USER_BY_ID = `SELECT * FROM users WHERE id = ? ALLOW FILTERING`;
const SELECT_USER_BY_USERNAME = `SELECT * FROM users WHERE userId = ? ALLOW FILTERING`;
const INSERT_USER = `INSERT INTO users (id, firstName, lastName, userId, password) VALUES (?, ?, ?, ?, ?)`;

export default {
  SELECT_USER_BY_ID,
  SELECT_USER_BY_USERNAME,
  INSERT_USER,
};

