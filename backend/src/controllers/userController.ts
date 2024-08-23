
const bcrypt = require('bcryptjs'); // Import bcrypt for password hashing
const userCassandra = require('../config/clientConfig');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator
const userQueries = require('../utils/queries/user');
const userParams = require('../utils/params/userParams');

class UserController {

  async findUserByEmail(userId: string): Promise<any | null> {
    const client = userCassandra.cassClient;
    const result = await client.execute(userQueries.SELECT_USER_BY_USERNAME, 
      userParams.selectUserByUsernameParams(userId), { prepare: true });

    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async updateUserPassword(hashedPassword: string, id: string): Promise<void> {
    const client = userCassandra.cassClient;
    // Update the query to use username instead of id
    await client.execute(userQueries.UPDATE_USER_PASSWORD, 
    userParams.updateUserPasswordParams(hashedPassword, id), {prepare: true});
  }

  async signup(firstName: string, lastName: string, userId: string, 
    password: string): Promise<any | null> {
        const id = uuidv4().toString(); // Generate a new UUID for the user
        console.log(typeof id);
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = userCassandra.cassClient;
        await client.execute(userQueries.INSERT_USER, 
          userParams.signupUserParams(id, firstName, lastName, 
            userId, hashedPassword), { prepare: true });

        const curr_user = await this.findUserByEmail(userId);
        if (!curr_user) {
            console.error('Error retrieving newly created user');
            return null;
        }
      
        return curr_user;
  }

  async login(username: string, password: string): Promise<any | null> {
        // Update the query to use username instead of id
        const curr_user = await this.findUserByEmail(username);
        if(!curr_user) {
          console.error('Error retrieving newly created user');
          return null;
        }
      
        const isPasswordValid = await bcrypt.compare(password, curr_user.password);

        if (isPasswordValid) {
            return curr_user;
        } else {
            console.error('Incorrect password');
            return null;
        }
  }

}

module.exports = { UserController };