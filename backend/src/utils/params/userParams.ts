
function selectUserByUsernameParams(userId: string) {
    return [userId];
}

function signupUserParams(id: string, firstName: string, 
    lastName: string, userId: string, hashedPassword: string) {
        return [id, firstName, lastName, 
            userId, hashedPassword];
}

function updateUserPasswordParams(hashedPassword: string, id:string) {
        return [hashedPassword, id];
}

export default {
    selectUserByUsernameParams,
    signupUserParams,
    updateUserPasswordParams
};