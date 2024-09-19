import { Router, Request, Response } from 'express';
import ListController from '../controllers/listController';
import CardController from '../controllers/cardController';
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

const router = Router();
const listController = new ListController();
const cardController = new CardController();

router.get('/', async (_req: Request, res: Response) => {
  try {
    const lists = await listController.findAllLists();
    return res.json(lists);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

// Handle form submission and validation
router.post('/add_list', async (req: Request, res: Response) => {
  try {
    const listId = uuidv4();
    const cardId = uuidv4(); // Generate a new UUID for the list
    const { name, username, title, description, activity } = req.body;
    const cards = await cardController.createCard(cardId, username, title, description, activity);
    await listController.createList(listId, name, [cards]);
    return res.json({ listId, name, cards: [cards] });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/update_list', async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body;
    await listController.updateList(id, name);
    const list = await listController.findList(id);
    
    return res.json({ list });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const listId: string = req.params['id'] || '';

    if (typeof listId !== 'string') {
      return res.status(400).json({ error: 'Invalid list ID' });
    }

    // Fetch the list details to get its cards
    const list = await listController.findList(listId);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }

    // Delete each card associated with the list
    for (const card of list.cards) {
      await cardController.deleteCard(card.id);
    }

    await listController.deleteList(listId);
    return res.json({ message: 'List and its cards deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
