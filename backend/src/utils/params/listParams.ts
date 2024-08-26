// src/userParams.ts
import { UUID } from "../types";

function selectListByIdParams(id: UUID) {
    return [id];
}

function createListParams(id: UUID, 
    name: string, cards: { cardId: number, username: string, 
        title: string, description: string, activity: string }[]) {
        return { id, name, cards: cards || [] };
}

function updateListParams(id: UUID, name?:string){
    return [name, id];
}

function deleteListParams(id: UUID){
    return [id];
}


module.exports = {
    selectListByIdParams,
    createListParams,
    updateListParams,
    deleteListParams
};