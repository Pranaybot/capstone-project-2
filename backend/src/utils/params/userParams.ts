// src/userParams.ts
import UUID from "../types";

function selectUserByUsernameParams(userId: string) {
    return [userId];
}

function signupUserParams(id: UUID, firstName: string, 
    lastName: string, userId: string, hashedPassword: string) {
        return [id, firstName, lastName, 
            userId, hashedPassword];
}

function updateUserPasswordParams(hashedPassword: string, id:UUID) {
        return [hashedPassword, id];
}

export default {
    selectUserByUsernameParams,
    signupUserParams,
    updateUserPasswordParams,
};
