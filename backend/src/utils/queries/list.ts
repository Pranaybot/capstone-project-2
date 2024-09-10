
const SELECT_ALL_LISTS = `SELECT * FROM lists ALLOW FILTERING`;
const SELECT_LIST_BY_ID = `SELECT * FROM lists WHERE id = ? ALLOW FILTERING`;
const ADD_LIST = `INSERT INTO lists (id, name, cards) VALUES (?, ?, ?)`;
const UPDATE_LIST_BY_ID = `UPDATE lists SET name = ? WHERE id = ?`;
const DELETE_LIST_BY_ID = `DELETE FROM lists WHERE id = ?`;
const DELETE_USER_LISTS = `TRUNCATE lists`;

export default {
    SELECT_ALL_LISTS,
    SELECT_LIST_BY_ID,
    ADD_LIST,
    UPDATE_LIST_BY_ID,
    DELETE_LIST_BY_ID,
    DELETE_USER_LISTS
};

