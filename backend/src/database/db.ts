//import { createSessionsTableQuery } from "../models/SessionsModel";
const userModel = require('../models/UserModel');
const listModel = require('../models/ListModel');
const cardModel = require('../models/CardModel');
const cardType = require('../cardType');

const host = require("../config/clientConfig");

async function initialize() {
    try {
        // Execute type creation queries first
        const client = host.cassClient;
        await client.execute(cardType.createType);

        // Then execute table creation queries
        //await client.execute(createSessionsTableQuery);
        await client.execute(userModel.createQuery);
        await client.execute(listModel.createTableQuery);
        await client.execute(cardModel.createTable);
        
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

module.exports = { initialize };
