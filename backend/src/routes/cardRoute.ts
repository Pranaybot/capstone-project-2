
import { Router, Request, Response } from 'express';
import { ListController } from "../controllers/listController";
import { CardController } from "../controllers/cardController";
import { v4 as uuidv4 } from 'uuid'; // Import UUID generator

const router = Router();
const listController = new ListController();
const cardController = new CardController();

router.post('/:listId/cards', async (req: Request, res: Response) => {
  try {
    const listId = req.params.listId;
    const { username, title, description, activity } = req.body;
  
    const list = await listController.findList(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
    
    const cardId = uuidv4(); // Generate a new UUID for the card
    await cardController.createCard(cardId, username, title, description, activity);
    const card = await cardController.findCard(cardId);
    list.cards.push(card);
    
    res.json({ card });
  } catch(error: any) {
      return res.status(500).json({ error: error.message });
  }
});

router.post('/:listId/cards/:cardId', async (req: Request, res: Response) => {
  try {
    const listId = req.params.listId;
    const cardId = req.params.cardId;
    const { username, title, description, activity } = req.body;

    const list = await listController.findList(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
  
    await cardController.updateCard(cardId, username, title, description, activity);
    const card = await cardController.findCard(cardId);
    const index = list.cards.findIndex((c: { id: string; }) => c.id === cardId);
    if(index !== -1) {
      list.cards[index] = card;
    }
    
    res.json({ card });
  } catch(error: any) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/:listId/cards/:cardId', async (req: Request, res: Response) => {
  try {
    const listId = req.params.listId;
    const cardId = req.params.cardId;
    
    const list = await listController.findList(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }
  
    const updatedCards = list.cards.filter((c: any) => (c: { id: string; }) => c.id !== cardId);
    list.cards = updatedCards;
    await cardController.deleteCard(cardId);    
    res.json({ message: 'Card deleted successfully' });
  } catch(error: any) {
    return res.status(500).json({ error: error.message });
  }
});


export default router;

