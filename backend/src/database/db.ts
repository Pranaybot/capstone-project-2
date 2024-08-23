//import { createSessionsTableQuery } from "../models/SessionsModel";
const { createUserTableQuery } = require('../models/UserModel');
const { createListTableQuery } = require('../models/ListModel');
const { createCardTableQuery } = require('../models/CardModel');
const { createCardTypeQuery } = require('../cardType');

const client = require("../config/clientConfig");

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
