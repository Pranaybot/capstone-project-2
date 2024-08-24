const createTableQuery = `
  CREATE TABLE IF NOT EXISTS lists (
    id uuid PRIMARY KEY,
    name text,
    cards list<frozen<card>>
  )
`;

module.exports = createTableQuery;
