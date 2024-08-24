//import { createSessionsTableQuery } from "../models/SessionsModel";
const userModel = require('../models/UserModel');
const listModel = require('../models/ListModel');
const cardModel = require('../models/CardModel');
const cardType = require('../cardType');

import cassClient from "../config/clientConfig";

async function initialize() {
    try {
        // Execute type creation queries first
        await cassClient.execute(cardType);

        // Then execute table creation queries
        //await client.execute(createSessionsTableQuery);
        await cassClient.execute(userModel);
        await cassClient.execute(listModel);
        await cassClient.execute(cardModel);
        
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

module.exports = { initialize };
