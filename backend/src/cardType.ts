const createCardTypeQuery = `
  CREATE TYPE IF NOT EXISTS card (
    id uuid,
    username text,
    title text,
    description text,
    activity text
  )
`;

module.exports = { createCardTypeQuery };
