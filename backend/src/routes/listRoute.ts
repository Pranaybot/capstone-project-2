
import { Router, Request, Response } from 'express';
import { ListController } from "../controllers/listController";

const router = Router();
const listController = new ListController();

router.get('/', async (req: Request, res: Response) => {
  try {
      const lists = await listController.findAllLists();
      const result = lists.rows.map((row: { listId: { toString: () => any; }; name: any; cards: any[]; }) => {
            row.listId.toString(),
            row.name,
            row.cards.map((card: any) => {
                card.cardId.toString(),
                card.username,
                card.title,
                card.description,
                card.activity
            })
      });
      res.json(result);
  } catch (error) {
      return res.json('Error adding or updating card:');
  }
});

// Handle form submission and validation
router.post('/add_list', async (req: Request, res: Response) => {
  try {
      // Create card in the database
      const { name, cards } = req.body;
      const createdList = await listController.createList(name, cards);

      if (createdList) {
        res.json({ redirect: "/" });
      } 
  } catch (error) {
      return res.json('Error adding list');
  }
});

router.post('/update_list', async (req: Request, res: Response) => {
  try {
      // Create card in the database
      const { id, name } = req.body;
      const updatedList = await listController.updateList(id, name);

      if (updatedList) {
        res.json({ redirect: "/" });
      } 
	  
  } catch (error) {
      return res.json('Error updating list');
  }
});

  // Delete a card by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
       const listId = req.params.id;
	
      // Attempt to delete the card from the database
      const listToBeDeleted = await listController.deleteList(listId);

      if (listToBeDeleted) {
        res.json({ redirect: "/" });
      }
	  
  } catch (error) {
      return res.json('Error deleting list');
  }
});

export default router;

