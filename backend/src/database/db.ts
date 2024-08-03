
import { createUserTableQuery } from "../models/UserModel";
/*
import { createListTableQuery } from "../models/listModel";
import { createCardTableQuery } from "../models/CardModel";
import { createCardTypeQuery } from "../utils/user_defined_types/cardType";
*/

import client from "../config/clientConfig";

async function initializeDatabase() {
    try {
        // Execute table creation queries
        await client.execute(createUserTableQuery);
        
        /*
        await client.execute(createListTableQuery);
        await client.execute(createCardTableQuery);

        // Execute type creation queries
        await client.execute(createCardTypeQuery);
        */
        
        
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

export default initializeDatabase;

