
import { Router, Request, Response } from 'express';
import { ListController } from "../controllers/listController";
import { CardController } from "../controllers/cardController";

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
  
    const card = await cardController.createCard(username, title, description, activity);
    list.cards.push(card);

    await listController.updateList(listId, list.name); // Save updated list with new card

    res.json({ list });
  } catch(error: any) {
      return res.status(500).json({ error: error.message });
  }
});

router.post('/:cardId', async (req: Request, res: Response) => {
  try {
    const cardId = req.params.cardId;
    const { username, title, description, activity } = req.body;
  
    await cardController.updateCard(cardId, username, title, description, activity);
    res.json({ message: 'Card updated successfully' });
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
  
    const updatedCards = list.cards.filter((card: any) => card.cardId !== cardId);
    list.cards = updatedCards;
    await cardController.deleteCard(cardId);
    await listController.updateList(listId, list.name); // Save updated list without deleted card
    
    res.json({ list });
  } catch(error: any) {
    return res.status(500).json({ error: error.message });
  }
});


export default router;

