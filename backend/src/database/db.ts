//import { createSessionsTableQuery } from "../models/SessionsModel";
import { createUserTableQuery } from "../models/UserModel";
import { createListTableQuery } from "../models/ListModel";
import { createCardTableQuery } from "../models/CardModel";
import { createCardTypeQuery } from "../cardType";

import client from "../config/clientConfig";

async function initializeDatabase() {
    try {
        // Execute type creation queries first
        await client.execute(createCardTypeQuery);

        // Then execute table creation queries
        //await client.execute(createSessionsTableQuery);
        await client.execute(createUserTableQuery);
        await client.execute(createListTableQuery);
        await client.execute(createCardTableQuery);
        
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

export default initializeDatabase;
