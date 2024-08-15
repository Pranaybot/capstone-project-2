
import { Router, Request, Response } from 'express';
import { ListController } from "../controllers/listController";

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
      const { name, cards } = req.body;
      const createdList = await listController.createList(name, cards);
      res.json({ list: createdList });
  } catch (error: any) {
      return res.status(500).json({ error: error.message });
  }
});

router.post('/update_list', async (req: Request, res: Response) => {
  try {
      const { id, name } = req.body;
      await listController.updateList(id, name);
      res.json({ message: 'List updated successfully' });
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

