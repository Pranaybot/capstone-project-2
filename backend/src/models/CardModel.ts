const createTable = `
  CREATE TABLE IF NOT EXISTS cards (
    id uuid PRIMARY KEY,
    username text,
    title text,
    description text,
    activity text
  )
`;

module.exports = createTable ;
