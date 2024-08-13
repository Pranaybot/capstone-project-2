import cassandra from "cassandra-driver";

function selectListByIdParams(id: string) {
    return [cassandra.types.Uuid.fromString(id)];
}

function createListParams(id: string, 
    name: string, cards: { cardId: number, username: string, 
        title: string, description: string, activity: string }[]) {
        return [cassandra.types.Uuid.fromString(id), name, cards];
}

function updateListParams(id: string, name: string){
    return [name, cassandra.types.Uuid.fromString(id)];
}

function deleteListParams(id: string){
    return [cassandra.types.Uuid.fromString(id)];
}


export default {
    selectListByIdParams,
    createListParams,
    updateListParams,
    deleteListParams
};