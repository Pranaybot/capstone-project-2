import cassandra from "cassandra-driver";

function selectUserByUsernameParams(userId: string) {
    return [userId];
}

function signupUserParams(id: string, firstName: string, 
    lastName: string, userId: string, hashedPassword: string) {
        return [cassandra.types.Uuid.fromString(id), firstName, lastName, 
            userId, hashedPassword];
}

function updateUserPasswordParams(id: string, hashedPassword: string) {
        return [cassandra.types.Uuid.fromString(id), hashedPassword];
}

export default {
    selectUserByUsernameParams,
    signupUserParams,
    updateUserPasswordParams
};