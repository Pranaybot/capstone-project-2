
import cassClient from "../config/clientConfig";
import cardQueries from '../utils/queries/card';
import cardParams from '../utils/params/cardParams';
import UUID from "../utils/types";

class CardController {

  async findCard(id: UUID): Promise<any | null> {
    try {
        const result = await cassClient.execute(cardQueries.SELECT_CARD_BY_ID, 
          cardParams.findOrDeleteCardParams(id), {prepare: true});
          return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error fetching card:', error);
      throw new Error('Failed to fetch card');
    }
  }
  
  async createCard(id: UUID, username: string, title: string, 
    description: string, activity: string): Promise<any | null> {
    try {
        await cassClient.execute(cardQueries.ADD_CARD, 
          cardParams.createCardParams(id, username, title, 
            description, activity), { prepare: true });
        const result = await this.findCard(id);
        return result;
    } catch (error) {
      console.error('Error creating card:', error);
      throw new Error('Failed to create card');
    }
  }

  async updateCard(cardId: UUID, username?: string, title?: string, 
    description?: string, activity?: string): Promise<void> {
    try {
      await cassClient.execute(cardQueries.UPDATE_CARD_BY_ID, 
        cardParams.updateCardParams(cardId, username, title, 
          description, activity), { prepare: true });
    } catch (error) {
      console.error('Error updating card:', error);
      throw new Error('Failed to update card');
    }
  }

  async deleteCard(id: UUID): Promise<void> {
    try {
      await cassClient.execute(cardQueries.DELETE_CARD_BY_ID, 
        cardParams.findOrDeleteCardParams(id), { prepare: true });
    } catch (error) {
      console.error('Error deleting card:', error);
      throw new Error('Failed to delete card');
    }
  }
}

export default CardController;

