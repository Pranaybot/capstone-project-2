
import bcrypt from 'bcryptjs'; // Import bcrypt for password hashing
import cassClient from "../config/clientConfig";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import userQueries from '../utils/queries/user';
import userParams from '../utils/params/userParams';
import UUID from "../utils/types";

class UserController {

  async findUserByEmail(userId: string): Promise<any | null> {
    const result = await cassClient.execute(userQueries.SELECT_USER_BY_USERNAME, 
      userParams.selectUserByUsernameParams(userId));

    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async updateUserPassword(hashedPassword: string, id: UUID): Promise<void> {
    // Update the query to use username instead of id
    await cassClient.execute(userQueries.UPDATE_USER_PASSWORD, 
    userParams.updateUserPasswordParams(hashedPassword, id), {prepare: true});
  }

  async deleteAccount(currUserId: UUID): Promise<void> {
    await cassClient.execute(userQueries.DELETE_USER_ACCOUNT, 
    userParams.deleteUserAccountParams(currUserId));
  }

  async signup(firstName: string, lastName: string, userId: string, 
    password: string): Promise<any | null> {
        const id = uuidv4().toString(); // Generate a new UUID for the user

        // Get salt rounds from environment variable
        const saltRounds = parseInt(process.env["BCRYPT_SALT_ROUNDS"] || '10', 10);
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        await cassClient.execute(userQueries.INSERT_USER, 
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

export default UserController;
