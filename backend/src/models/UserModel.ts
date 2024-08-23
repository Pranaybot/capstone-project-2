const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY,
    firstName text,
    lastName text,
    userId text,
    password text
  )
`;

module.exports = { createUserTableQuery };
