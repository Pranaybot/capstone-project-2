import { Router, Request, Response } from 'express';
import { ListController } from "../controllers/listController";
import { CardController } from "../controllers/cardController";
import listAddMiddleware from "../middleware/listAddMiddlware";
import listUpdateMiddleware from "../middleware/listUpdateMiddleware";
import cardAddMiddleware from "../middleware/cardAddMiddleware";

const router = Router();
const listController = new ListController();
const cardController = new CardController();

router.get('/', async (req: Request, res: Response) => {
  try {
      const lists = await listController.findAllLists();
      const result = lists.rows.map(row => {
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
      console.error('Error adding or updating card:', error);
      res.send(`
        <script>
            localStorage.setItem('error', ${JSON.stringify(error.message)});
            window.location.href = '/work_area';
        </script>
      `);
  }
});

// Handle form submission and validation
router.post('/add_list', listAddMiddleware, async (req: Request, res: Response) => {
  try {
      // Create card in the database
      const { name, cards } = req.body;
      const createdList = await listController.createList(name, cards);

      if (createdList) {
	      res.redirect("/");
      } 
  } catch (error) {
      console.error('Error adding list', error);
      res.send(`
        <script>
            localStorage.setItem('error', ${JSON.stringify(error.message)});
            window.location.href = '/work_area';
        </script>
      `);
  }
});

router.post('/update_list', listUpdateMiddleware, async (req: Request, res: Response) => {
  try {
      // Create card in the database
      const { id, name } = req.body;
      const updatedList = await listController.updateList(id, name);

      if (updatedList) {
	      res.redirect("/");
      } 
	  
  } catch (error) {
      console.error('Error updating list', error);
      res.send(`
        <script>
            localStorage.setItem('error', ${JSON.stringify(error.message)});
            window.location.href = '/work_area';
        </script>
      `);
  }
});

  // Delete a card by ID
router.delete('/:id', async (req: Request, res: Response) => {
  try {
       const listId = req.params.id;
	
      // Attempt to delete the card from the database
      const listToBeDeleted = await listController.deleteList(listId);

      if (listToBeDeleted) {
	      res.redirect("/");
      }
	  
  } catch (error) {
      console.error('Error deleting list', error);
      res.send(`
        <script>
            localStorage.setItem('error', ${JSON.stringify(error.message)});
            window.location.href = '/work_area';
        </script>
      `);
  }
});

router.post('/:listId/cards', cardAddMiddleware,  async (req: Request, res: Response) => {
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
    res.redirect("/");
  } catch(error) {
      console.error('Error creating card', error);
      res.send(`
        <script>
            localStorage.setItem('error', ${JSON.stringify(error.message)});
            window.location.href = '/work_area';
        </script>
      `);
  }

});

router.post('/cards/:cardId', cardAddMiddleware, async (req: Request, res: Response) => {

  try {
    const cardId = req.params.cardId;
    const { username, title, description, activity } = req.body;
  
    const card = await cardController.updateCard(cardId, username, title, 
    description, activity);
      
    res.redirect("/");
  } catch(error) {
      console.error('Error updating card', error);
      res.send(`
        <script>
            localStorage.setItem('error', ${JSON.stringify(error.message)});
            window.location.href = '/work_area';
        </script>
      `);
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
    res.redirect("/");
  } catch(error) {
    console.error('Error deleting card', error);
    res.send(`
      <script>
          localStorage.setItem('error', ${JSON.stringify(error.message)});
          window.location.href = '/work_area';
      </script>
    `);
  }

});


export default router;
