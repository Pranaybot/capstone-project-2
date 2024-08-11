
function selectOrDeleteSessionByIdParams(sid: string) {
    return [sid];
}

function addSessionDataByIdParams(sid: string, sessionData: any) {
        return [sid, sessionData];
}

export default {
    selectOrDeleteSessionByIdParams,
    addSessionDataByIdParams
};