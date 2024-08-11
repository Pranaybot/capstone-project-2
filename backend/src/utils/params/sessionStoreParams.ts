
function deleteSessionByIdParams(sid: string) {
    return [sid];
}

function addSessionDataByIdParams(sid: string, sessionData: any) {
        return [sid, sessionData];
}

export default {
    deleteSessionByIdParams,
    addSessionDataByIdParams
};