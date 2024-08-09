import cassandra from "cassandra-driver";

function selectUserByEmailParams(userId: string) {
    return [userId];
}

function signupUserParams(id: string, firstName: string, 
    lastName: string, userId: string, hashedPassword: string) {
        return [cassandra.types.Uuid.fromString(id), firstName, lastName, 
            userId, hashedPassword];
}

export default {
    selectUserByEmailParams,
    signupUserParams
};