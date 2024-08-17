
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import client  from "../config/clientConfig";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import userQueries from "../utils/queries/user";
import userParams from "../utils/params/userParams";

export class UserController {

  async findUserByEmail(userId: string): Promise<any | null> {
    const result = await client.execute(userQueries.SELECT_USER_BY_USERNAME, 
      userParams.selectUserByUsernameParams(userId), { prepare: true });

    return result.rows.length > 0 ? result.rows[0] : null;
  }

  async updateUserPassword(id: string, hashedPassword: string): Promise<void> {
    // Update the query to use username instead of id
    await client.execute(userQueries.UPDATE_USER_PASSWORD, 
      userParams.updateUserPasswordParams(id, hashedPassword), {prepare: true});
  }

  async signup(firstName: string, lastName: string, userId: string, 
    password: string): Promise<any | null> {
        const id = uuidv4(); // Generate a new UUID for the user
        const hashedPassword = await bcrypt.hash(password, 10);

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