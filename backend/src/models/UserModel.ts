const createQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY,
    firstName text,
    lastName text,
    userId text,
    password text
  )
`;

export default createQuery;
