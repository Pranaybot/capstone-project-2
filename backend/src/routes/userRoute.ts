import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import CassandraStore from "../cassandra-session-store";
import client from '../config/clientConfig';

const router = Router();
const userController = new UserController();
const store = new CassandraStore(client);

function do_login(user: any, req: Request, store: CassandraStore) {
    req.session.userId = user.id; // Set custom session properties
    req.session.isLoggedIn = true;

    // Save session data using CassandraStore's set method
    store.set(req.sessionID, req.session, (err) => {
        if (err) {
            console.error('Error saving session:', err);
        } else {
            console.log('Session saved successfully:', req.session);
        }
    });
}

function do_logout(req: Request, res: Response, store: CassandraStore) {
    try {
      // Retrieve the session using the session ID
      const session = await store.get();
      if (session) {
        // Destroy the session
        await store.destroy(session.session_id);
        res.status(200).send('Session destroyed successfully');
      } else {
        res.status(404).send('Session not found');
      }
    } catch (err) {
      console.error('Error checking login status:', err);
      res.status(500).send('Server error');
    }
  }
  

router.post('/signup', async (req: Request, res: Response) => {

    const { firstName, lastName, username, pwd } = req.body; // Note: Matching formControlName

    try {
        const existingUser = await userController.findUserByEmail(username);
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists with this email.' });
        }
        
        const user = await userController.signup(firstName, lastName, username, pwd);
        if (user) {
            do_login(user, req, store);
            return res.status(201).json({ message: 'User created successfully.' });
        } else {
            return res.json({ message: "Cannot find new user" });
        }
    } catch (error) {
        return res.status(500).json({ messsage: 'Server error' });
    }
});

router.post('/login', async (req: Request, res: Response) => {

    const { username, pwd } = req.body;

    try {
        const user = await userController.login(username, pwd);
        if (user) {
            debugger;
            do_login(user, req, store);
            return res.json({ message: 'Logged in successfully' })
        } else {
            return res.status(401).json({ message: 'Invalid username or password' })
        }
    } catch (error) {
        return res.status(500).json({ messsage: 'Server error' });
    }
});

router.get('/check-login', async (req: Request, res: Response) => {
    try {
      // Retrieve the session data using the session ID from the store
      const sessionData = await store.get();
  
      if (!sessionData) {
        // No session found for the given session ID
        return res.json({ error: 'No active session found' });
      }
  
      // Check if the session indicates the user is logged in
      const isLoggedIn = sessionData.isLoggedIn;
      return res.json({ isLoggedIn });
    } catch (err) {
      console.error('Error checking login status:', err);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  
router.get('/logout', (req: Request, res: Response) => {
    debugger;
    do_logout(req, res, store);
});

export default router;
