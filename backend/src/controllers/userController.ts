
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import cassandra from "cassandra-driver";
import client  from "../config/clientConfig";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import userQueries from "../utils/queries/user";

export class UserController {

  async findUserByEmail(userId: string): Promise<any | null> {
    const selectParams = [cassandra.types.Uuid.fromString(id)];
    const result = await client.execute(userQueries.SELECT_USER_BY_ID, 
        selectParams, { prepare: true });

    return result.rows.length > 0 ? result.rows[0] : null;
  }
  
  async signup(firstName: string, lastName: string, userId: string, 
    password: string): Promise<any | null> {
    try {
        const id = uuidv4(); // Generate a new UUID for the user
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertParams = [cassandra.types.Uuid.fromString(id), firstName, lastName, 
            userId, hashedPassword];
        await client.execute(userQueries.INSERT_USER, insertParams, { prepare: true });

        const curr_user = await findUserByEmail(userId);
        if (!curr_user) {
            console.error('Error retrieving newly created user');
            return null;
        }
      
        return curr_user;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
  }

  async login(username: string, password: string): Promise<any | null> {
    try {
        // Update the query to use username instead of id
        const curr_user = await findUserByEmail(username);
        if(!curr_user) {
          console.error('Error retrieving newly created user');
          return null;
        }
      
        const isPasswordValid = await bcrypt.compare(password, curr_user.password);

        if (isPasswordValid) {
            return user;
        } else {
            console.error('Incorrect password');
            return null;
        }
    } catch (error) {
        console.error('Error logging in user:', error);
        return null;
    }
  }

}

