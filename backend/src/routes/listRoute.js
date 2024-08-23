const { Router } = require('express');
const { ListController } = require('../controllers/listController');
const { v4: uuidv4 } = require('uuid'); // Import UUID generator

const router = Router();
const listController = new ListController();

router.get('/', async (req, res) => {
  try {
    const lists = await listController.findAllLists();
    return res.json(lists);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

// Handle form submission and validation
router.post('/add_list', async (req, res) => {
  try {
    const id = uuidv4(); // Generate a new UUID for the list
    const { name, cards } = req.body;
    await listController.createList(id, name, cards);
    return res.json({ id, name, cards });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post('/update_list', async (req, res) => {
  try {
    const { id, name } = req.body;
    await listController.updateList(id, name);
    const list = await listController.findList(id);
    
    return res.json({ list });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const listId = req.params['id'];

    if (typeof listId !== 'string') {
      return res.status(400).json({ error: 'Invalid list ID' });
    }

    await listController.deleteList(listId);
    return res.json({ message: 'List deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;
