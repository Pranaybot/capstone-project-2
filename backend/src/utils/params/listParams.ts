
function selectListByIdParams(id: string) {
    return [id];
}

function createListParams(id: string, 
    name: string, cards: { cardId: number, username: string, 
        title: string, description: string, activity: string }[]) {
        return [id, name, cards];
}

function updateListParams(id: string, name?:string){
    return [name, id];
}

function deleteListParams(id: string){
    return [id];
}


module.exports = {
    selectListByIdParams,
    createListParams,
    updateListParams,
    deleteListParams
};