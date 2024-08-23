
function findOrDeleteCardParams(id: string) {
    return [id];
}

function createCardParams(cardId: string, username: string, title: string, 
    description: string, activity: string) {
        return [cardId, username, title, description, activity];
}

function updateCardParams(cardId: string, username?: string, title?: string, 
    description?: string, activity?: string) {
        return [username, title, description, activity, cardId];
}

module.exports = {
    findOrDeleteCardParams,
    createCardParams,
    updateCardParams
};