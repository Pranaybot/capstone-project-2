import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
//import CassandraStore from "../cassandra-session-store";
//import client from '../config/clientConfig';
import * as bcrypt from 'bcryptjs'; // Import bcrypt for password hashing

const router = Router();
const userController = new UserController();
//const store = new CassandraStore(client);

function check_passwords(password1: string, password2: string) {
    if (password1 !== password2) {
        return false;
    } else {
        return true;
    }
}

function do_login(user: any, req: Request, _res: Response) {
    const session = req.session;
    session.userId = user.id;
    session.password = password;
    console.log('Successfully logged in!');

    /*
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
    */
}

async function do_logout(req: Request, res: Response) {
    try {
        req.session.destroy;
        res.status(200).json({ message: 'Session destroyed successfully' });
    } catch(err) {
        console.error('Error checking session status:', err);
        res.status(404).json({ error: 'Session not found' });
    }
    /*
    try {
      // Retrieve the session using the session ID
      const session = await store.get();
      if (session) {
        // Destroy the session
        await store.destroy(session.session_id);
        res.status(200).json({ message: 'Session destroyed successfully' });
      } else {
        res.status(404).json({ error: 'Session not found' });
      }
    } catch (err) {
      console.error('Error checking login status:', err);
      res.status(500).json({ error: 'Server error' });
    }
    */
}

router.post('/signup', async (req: Request, res: Response) => {

    const { firstName, lastName, username, pwd } = req.body; // Note: Matching formControlName

    try {
        const currUser = await userController.findUserByEmail(username);
        if (currUser) {
            return res.status(409).json({ message: 'User already exists with this email.' });
        }
        
        const user = await userController.signup(firstName, lastName, username, pwd);
        if (user) {
            //do_login(user, req, store);
            do_login(user, req, res);
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
            //do_login(user, req, store);
            do_login(user, req, res);
            return res.json({ message: 'Logged in successfully' })
        } else {
            return res.status(401).json({ message: 'Invalid username or password' })
        }
    } catch (error) {
        return res.status(500).json({ messsage: 'Server error' });
    }
});

router.post('/reset_password', async (req: Request, res: Response) => {

    const { username, old_pwd, new_pwd, new_pwd_match } = req.body;

    try {
        const currUser = await userController.findUserByEmail(username)
        if (currUser) {
            
            const isPasswordValid = await bcrypt.compare(old_pwd, currUser.password);

            if (isPasswordValid) {
                 if(check_passwords(new_pwd, new_pwd_match)){
                    const hashedPassword = await bcrypt.hash(new_pwd, 10);
                    const currUserId = currUser.id.toString();

                    await userController.updateUserPassword(hashedPassword, currUserId);
                    return res.json({ message: "The password updated successfully" });
                 } else {
                    return res.json({ message: "The passwords don't match"});
                 }
            } else {
                return res.json({ message: "The old password you entered is invalid" });
            }
        } else {
            return res.json({ message: "User does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ messsage: 'Server error' });
    }
});

router.get('/logout', (req: Request, res: Response) => {
    //do_logout(req, res, store);
    do_logout(req, res);
});

export default router;
