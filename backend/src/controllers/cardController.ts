
import cassandra from "cassandra-driver";
import client  from "../config/clientConfig";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import cardQueries from "../utils/queries/card";
import cardParams from "../utils/params/cardParams";

export class CardController {

  async findCard(id: string): Promise<any | null> {
    try {
	      const selectParams = [cassandra.types.Uuid.fromString(id)];
        const result = await client.execute(cardQueries.SELECT_CARD_BY_ID, 
          cardParams.findOrDeleteCardParams(id), {prepare: true});
      
        return result;
    } catch (error) {
        console.error('Error fetching list:', error);
        return null;
    }
  }
  
  async createCard(username: string, title: string, 
    description: string, activity: string): Promise<any | null> {
    try {
        const cardId = uuidv4(); // Generate a new UUID for the card
        const cardInsert = await client.execute(cardQueries.ADD_CARD, 
          cardParams.createCardParams(cardId, username,title, 
            description, activity), { prepare: true });
        return cardInsert;
    } catch (error) {
        console.error('Error creating card:', error);
        return null;
    }
  }

  async updateCard(cardId: string, username?: string, title?: string, 
    description?: string, activity?: string): Promise<any | null> {
    try {
      const card_update = await client.execute(cardQueries.UPDATE_CARD_BY_ID, 
        cardParams.updateCardParams(cardId, username, title, 
          description, activity), { prepare: true });
      return card_update;
    } catch (error) {
      console.error('Error updating card:', error);
      return null;
    }
  }

  async deleteCard(id: string): Promise<any | null> {
    try {
        const card_delete = await client.execute(cardQueries.DELETE_CARD_BY_ID, 
          cardParams.findOrDeleteCardParams(id), { prepare: true });
        return card_delete;
    } catch (error) {
        console.error('Error deleting list:', error);
        return false;
    }
  }
}

