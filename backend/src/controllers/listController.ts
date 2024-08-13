
import cassandra from "cassandra-driver";
import client from "../config/clientConfig";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator
import listQueries from "../utils/queries/list";
import listParams from "../utils/params/listParams";

export class ListController {

  async findAllLists(): Promise<any | null> {
    try {
      const result = await client.execute(listQueries.SELECT_ALL_LISTS);
      return result.rows; // Return the rows directly
    } catch (error) {
      console.error('Error fetching lists:', error);
      return null;
    }
  }

  async findList(id: string): Promise<any | null> {
    try {
      const selectParams = [cassandra.types.Uuid.fromString(id)];
      const result = await client.execute(listQueries.SELECT_LIST_BY_ID, 
        listParams.selectListByIdParams(id), { prepare: true });
      return result.rows; // Return the rows directly
    } catch (error) {
      console.error('Error fetching list:', error);
      return null;
    }
  }

  async createList(name: string, cards: { cardId: number, username: string, 
    title: string, description: string, activity: string }[]): Promise<any | null> {
    try {
        const id = uuidv4(); // Generate a new UUID for the list

        const listInsert = await client.execute(listQueries.ADD_LIST, 
          listParams.createListParams(id, name, cards), { prepare: true });
        return listInsert;
    } catch (error) {
        console.error('Error creating list:', error);
        return null;
    }
  }

  async updateList(id: string, name: string): Promise<any | null> {
    try {
      const updateParams = [name, cassandra.types.Uuid.fromString(id)];
      const listUpdate = await client.execute(listQueries.UPDATE_LIST_BY_ID, 
        listParams.updateListParams(id, name), { prepare: true });
      return listUpdate;
    } catch (error) {
      console.error('Error updating list:', error);
      return null;
    }
  }

  async deleteList(id: string): Promise<any | null> {
    try {
      const deleteParams = [cassandra.types.Uuid.fromString(id)];
      const listDelete = await client.execute(listQueries.DELETE_LIST_BY_ID, 
        listParams.deleteListParams(id), { prepare: true });
      return listDelete;
    } catch (error) {
      console.error('Error deleting list:', error);
      return null;
    }
  }
}

