
import { Router, Request, Response } from 'express';
import { ListController } from "../controllers/listController";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

const router = Router();
const listController = new ListController();

router.get('/', async (req: Request, res: Response) => {
  try {
      const lists = await listController.findAllLists();
      res.json(lists);
  } catch (error: any) {
      return res.status(500).json({ error: error.message });
  }
});

// Handle form submission and validation
router.post('/add_list', async (req: Request, res: Response) => {
  try {
      const id = uuidv4(); // Generate a new UUID for the list
      const { name, cards } = req.body;
      await listController.createList(id, name, cards);
      res.json({ id, name, cards });
  } catch (error: any) {
      return res.status(500).json({ error: error.message });
  }
});

router.post('/update_list', async (req: Request, res: Response) => {
  try {
      const { id, name } = req.body;
      const list = await listController.updateList(id, name);
      res.json({ list });
  } catch (error: any) {
      return res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
      const listId = req.params.id;
      await listController.deleteList(listId);
      res.json({ message: 'List deleted successfully' });
  } catch (error: any) {
      return res.status(500).json({ error: error.message });
  }
});

export default router;

