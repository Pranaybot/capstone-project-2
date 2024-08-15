
import client  from "../config/clientConfig";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import cardQueries from "../utils/queries/card";
import cardParams from "../utils/params/cardParams";

export class CardController {

  async findCard(id: string): Promise<any | null> {
    try {
        const result = await client.execute(cardQueries.SELECT_CARD_BY_ID, 
          cardParams.findOrDeleteCardParams(id), {prepare: true});
          return result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error('Error fetching card:', error);
      throw new Error('Failed to fetch card');
    }
  }
  
  async createCard(username: string, title: string, 
    description: string, activity: string): Promise<any> {
    try {
        const cardId = uuidv4(); // Generate a new UUID for the card
        const cardData = { cardId, username, title, description, activity };
        await client.execute(cardQueries.ADD_CARD, 
          cardParams.createCardParams(cardId, username,title, 
            description, activity), { prepare: true });
        return cardData;
    } catch (error) {
      console.error('Error creating card:', error);
      throw new Error('Failed to create card');
    }
  }

  async updateCard(cardId: string, username?: string, title?: string, 
    description?: string, activity?: string): Promise<void> {
    try {
      await client.execute(cardQueries.UPDATE_CARD_BY_ID, 
        cardParams.updateCardParams(cardId, username, title, 
          description, activity), { prepare: true });
    } catch (error) {
      console.error('Error updating card:', error);
      throw new Error('Failed to update card');
    }
  }

  async deleteCard(id: string): Promise<void> {
    try {
      await client.execute(cardQueries.DELETE_CARD_BY_ID, 
        cardParams.findOrDeleteCardParams(id), { prepare: true });
    } catch (error) {
      console.error('Error deleting card:', error);
      throw new Error('Failed to delete card');
    }
  }
}

