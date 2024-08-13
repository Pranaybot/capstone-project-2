
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
  
    const list = await cardController.findCard(listId);
    if (!list) {
      // Handle the case where the list is not found (e.g., return an error)
      return res.status(404).json({ message: "List not found" });
    }
  
    const card = await cardController.createCard(username, title, 
    description, activity);
    
    list.cards.push(card);
    res.json({ redirect: "/list" });
  } catch(error) {
      return res.json('Error creating card');
  }

});

router.post('/:cardId', async (req: Request, res: Response) => {

  try {
    const cardId = req.params.cardId;
    const { username, title, description, activity } = req.body;
  
    const card = await cardController.updateCard(cardId, username, title, 
    description, activity);
      
    res.json({ redirect: "/list" });
  } catch(error) {
      return res.json('Error updating card');
  }

});

router.delete('/:listId/cards/:cardId', async (req: Request, res: Response) => {

  try {
    const listId = req.params.listId;
    const cardId = req.params.cardId;
    const list = await listController.findList(listId);
    if (!list) {
      // Handle the case where the list is not found (e.g., return an error)
      return res.status(404).json({ message: "List not found" });
    }
  
    const card = await cardController.findCard(cardId);
    
    list.cards.remove(card);
    res.json({ redirect: "/list" });
  } catch(error) {
    return res.json('Error deleting card');
  }

});


export default router;

