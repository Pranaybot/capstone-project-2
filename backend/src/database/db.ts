import userModel from '../models/UserModel';
import listModel from '../models/ListModel';
import cardModel from '../models/CardModel';
import cardType from '../cardType';

import cassClient from "../config/clientConfig";

async function initialize() {
    try {
        // Execute type creation queries first
        await cassClient.execute(cardType);

        // Then execute table creation queries
        await cassClient.execute(userModel);
        await cassClient.execute(listModel);
        await cassClient.execute(cardModel);
        
        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

export default initialize ;
