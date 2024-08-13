import cassandra from "cassandra-driver";

function findOrDeleteCardParams(id: string) {
    return [cassandra.types.Uuid.fromString(id)];
}

function createCardParams(cardId: string, username: string, title: string, 
    description: string, activity: string) {
        return [cassandra.types.Uuid.fromString(cardId), username, title, 
            description, activity];
}

function updateCardParams(cardId: string, username?: string, title?: string, 
    description?: string, activity?: string) {
        return [cassandra.types.Uuid.fromString(cardId), username, title, 
            description, activity];
}

export default {
    findOrDeleteCardParams,
    createCardParams,
    updateCardParams
};