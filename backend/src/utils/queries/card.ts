
const SELECT_CARD_BY_ID = `SELECT * FROM cards WHERE id = ?`;
const ADD_CARD = `INSERT INTO cards (id, username, title, 
          description, activity) VALUES (?, ?, ?, ?, ?)`;
const UPDATE_CARD_BY_ID = `UPDATE cards SET username = ?, title = ?, 
        description = ?, activity = ? WHERE id = ?`;
const DELETE_CARD_BY_ID = `DELETE FROM cards WHERE id = ?`;

export default {
    SELECT_CARD_BY_ID,
    ADD_CARD,
    UPDATE_CARD_BY_ID,
    DELETE_CARD_BY_ID
};

