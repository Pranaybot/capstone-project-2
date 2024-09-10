// src/userParams.ts
import UUID from "../types";

function selectListByIdParams(id: UUID) {
    return [id];
}

function createListParams(id: UUID, 
    name: string, cards: { cardId: number, username: string, 
        title: string, description: string, activity: string }[]) {
        return [id, name, cards];
}

function updateListParams(id: UUID, name?:string){
    return [name, id];
}

function deleteListParams(id: UUID){
    return [id];
}

export default {
    selectListByIdParams,
    createListParams,
    updateListParams,
    deleteListParams
};
