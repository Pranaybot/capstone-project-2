// src/userParams.ts
import { UUID } from "../types";

function findOrDeleteCardParams(id: UUID) {
    return [id];
}

function createCardParams(cardId: UUID, username: string, title: string, 
    description: string, activity: string) {
        return [cardId, username, title, description, activity];
}

function updateCardParams(cardId: UUID, username?: string, title?: string, 
    description?: string, activity?: string) {
        return [username, title, description, activity, cardId];
}

module.exports = {
    findOrDeleteCardParams,
    createCardParams,
    updateCardParams
};