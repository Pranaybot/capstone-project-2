import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import signUpMiddleware from "../middleware/signupMiddleware";
import loginMiddleware from "../middleware/loginMiddleware";
import { validationResult } from 'express-validator';

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

router.post('/signup', signUpMiddleware, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { firstName, lastName, username, pwd } = req.body; // Note: Matching formControlName

    try {
        const user = await userController.signup(firstName, lastName, username, pwd);
        if (user) {
            do_login(user, req);
            res.redirect("/work_area");
        }
    } catch (error) {
        console.error('Failed to create user', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
});

router.post('/login', loginMiddleware, async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, pwd } = req.body;

    try {
        const user = await userController.login(username, pwd);
        if (user) {
            do_login(user, req);
            res.redirect('/work_area');
        }
    } catch (error) {
        console.error('Invalid username or password', error);
        res.status(500).json({ error: 'Invalid username or password' });
    }
});

router.get('/logout', (req: Request, res: Response) => {
    do_logout(req);
    res.redirect("/");
});

export default router;
