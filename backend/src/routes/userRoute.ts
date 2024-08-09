import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

function do_login(user: any, req: Request) {
    req.session.user_id = user.id; // Use session or any other way to manage login state
    req.session.isLoggedIn = true;
}

function do_logout(req: Request) {
    delete req.session.user_id;
    req.session.isLoggedIn = false;
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
            return res.json({ message: 'Invalid username or password' })
        }
    } catch (error) {
        return res.status(500).json({ messsage: 'Server error' });
    }
});

router.get('/logout', (req: Request, res: Response) => {
    do_logout(req);
    res.redirect("/");
});

export default router;
