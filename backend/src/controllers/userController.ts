
import * as bcrypt from 'bcrypt'; // Import bcrypt for password hashing
import cassandra from "cassandra-driver";
import client  from "../config/clientConfig";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import userQueries from "../utils/queries/user";

export class UserController {
  async signup(firstName: string, lastName: string, userId: string, 
    password: string): Promise<any | null> {
    try {
        const id = uuidv4(); // Generate a new UUID for the user
        const hashedPassword = await bcrypt.hash(password, 10);

        const insertParams = [cassandra.types.Uuid.fromString(id), firstName, lastName, 
            userId, hashedPassword];
        await client.execute(userQueries.INSERT_USER, insertParams, { prepare: true });

        const selectParams = [cassandra.types.Uuid.fromString(id)];
        const result = await client.execute(userQueries.SELECT_USER_BY_ID, 
            selectParams, { prepare: true });

        if (result.rows.length === 0) {
            console.error('Error retrieving newly created user');
            return null;
        }

        const newUser = result.rows[0];
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        return null;
    }
  }

  async login(username: string, password: string): Promise<any | null> {
    try {
        // Update the query to use username instead of id
        const selectParams = [username];
        const result = await client.execute(userQueries.SELECT_USER_BY_USERNAME, 
            selectParams, { prepare: true });

        if (result.rows.length === 0) {
            return null; // User not found
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);

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

