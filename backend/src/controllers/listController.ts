
const listCassandra = require('../config/clientConfig');
const listQueries = require('../utils/queries/list');
const listParams = require('../utils/params/listParams');

class ListController {

  async findAllLists(): Promise<any[]> {
    try {
      const client = listCassandra.cassClient;
      const result = await client.execute(listQueries.SELECT_ALL_LISTS);
      return result.rows; // Return the rows directly
    } catch (error) {
      console.error('Error fetching lists:', error);
      throw new Error('Failed to fetch lists');
    }
  }

  async findList(id: string): Promise<any | null> {
    try {
      const client = listCassandra.cassClient;
      const result = await client.execute(listQueries.SELECT_LIST_BY_ID, 
        listParams.selectListByIdParams(id), { prepare: true });
      return result.rows.length > 0 ? result.rows : null;
    } catch (error) {
      console.error('Error fetching list:', error);
      throw new Error('Failed to fetch list');
    }
  }

  async createList(id: string, name: string, 
    cards: { cardId: number, username: string, title: string, 
      description: string, activity: string }[]): Promise<any | null> {
    try {
        const client = listCassandra.cassClient;
        await client.execute(listQueries.ADD_LIST, 
          listParams.createListParams(id, name, cards), { prepare: true });
    } catch (error) {
      console.error('Error creating list:', error);
      throw new Error('Failed to create list');
    }
  }

  async updateList(id: string, name: string): Promise<void> {
    try {
      const client = listCassandra.cassClient;
      await client.execute(listQueries.UPDATE_LIST_BY_ID, 
        listParams.updateListParams(id, name), { prepare: true });
      const result = await this.findList(id);
      return result;
    } catch (error) {
      console.error('Error updating list:', error);
      throw new Error('Failed to update list');
    }
  }

  async deleteList(id: string): Promise<void> {
    try {
      const client = listCassandra.cassClient;
      await client.execute(listQueries.DELETE_LIST_BY_ID, 
        listParams.deleteListParams(id), { prepare: true });
    } catch (error) {
      console.error('Error deleting list:', error);
      throw new Error('Failed to delete list');
    }
  }
}

module.exports = ListController;

