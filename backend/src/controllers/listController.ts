
import cassClient from "../config/clientConfig";
import listQueries from '../utils/queries/list';
import listParams from '../utils/params/listParams';
import UUID from "../utils/types";

class ListController {

  async findAllLists(): Promise<any[]> {
    try {
      const result = await cassClient.execute(listQueries.SELECT_ALL_LISTS);
      return result.rows; // Return the rows directly
    } catch (error) {
      console.error('Error fetching lists:', error);
      throw new Error('Failed to fetch lists');
    }
  }

  async findList(id: UUID): Promise<any | null> {
    try {
      const result = await cassClient.execute(listQueries.SELECT_LIST_BY_ID, 
        listParams.selectListByIdParams(id), { prepare: true });
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error fetching list:', error);
      throw new Error('Failed to fetch list');
    }
  }

  async createList(id: UUID, name: string, 
    cards: { cardId: number, username: string, title: string, 
      description: string, activity: string }[]): Promise<any | null> {
    try {
        await cassClient.execute(listQueries.ADD_LIST, 
          listParams.createListParams(id, name, cards), { prepare: true });
    } catch (error) {
      console.error('Error creating list:', error);
      throw new Error('Failed to create list');
    }
  }

  async updateList(id: UUID, name: string): Promise<void> {
    try {
      await cassClient.execute(listQueries.UPDATE_LIST_BY_ID, 
        listParams.updateListParams(id, name), { prepare: true });
      const result = await this.findList(id);
      return result;
    } catch (error) {
      console.error('Error updating list:', error);
      throw new Error('Failed to update list');
    }
  }

  async deleteList(id: UUID): Promise<void> {
    try {
      await cassClient.execute(listQueries.DELETE_LIST_BY_ID, 
        listParams.deleteListParams(id), { prepare: true });
    } catch (error) {
      console.error('Error deleting list:', error);
      throw new Error('Failed to delete list');
    }
  }

  async deleteLists(): Promise<void> {
    await cassClient.execute(listQueries.DELETE_USER_LISTS);
  }

}

export default ListController;

