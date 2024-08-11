import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

function do_login(user: any, req: Request) {
    req.session.userId = user.id; // Set custom session properties
    req.session.isLoggedIn = true;

    req.session.save((err: any) => {
        if (err) {
            console.error('Error saving session:', err);
        } else {
            console.log('Session saved successfully:', req.session);
        }
    });
}

function do_logout(req: Request) {
    delete req.session.userId;
    req.session.isLoggedIn = false;

    req.session.save((err: any) => {
        if (err) {
            console.error('Error saving session after logout:', err);
        } else {
            console.log('Session cleared successfully.');
        }
    });
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
            do_login(user, req);
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
            do_login(user, req);
            return res.json({ message: 'Logged in successfully' })
        } else {
            return res.status(401).json({ message: 'Invalid username or password' })
        }
    } catch (error) {
        return res.status(500).json({ messsage: 'Server error' });
    }
});

router.get('/check-login', (req: Request, res: Response) => {
    const isLoggedIn = req.session.isLoggedIn || false;
    return res.json({ isLoggedIn });
});
  
router.get('/logout', (req: Request, res: Response) => {
    do_logout(req);
    res.redirect("/");
});

export default router;
