import { Router, Request, Response } from 'express';
import UserController from '../controllers/userController';
import ListController from '../controllers/listController';
import CardController from '../controllers/cardController';
import bcrypt from 'bcryptjs';
import '../utils/session_variables';

const router = Router();
const userController = new UserController();
const listController = new ListController();
const cardController = new CardController();

// Helper function to compare passwords
function checkPasswords(password1: string, password2: string): boolean {
    return password1 === password2;
}

// Helper function to handle login process
function doLogin(user: any, req: Request, _res: Response): void {
    const session = req.session;
    if (session) {
        session.userId = user.id;
        session.isLoggedIn = true;
        console.log('Successfully logged in!');
    }
}

// Helper function to handle logout process
async function doLogout(req: Request, res: Response): Promise<void> {
    try {
        if (req.session) {
            await new Promise((resolve, reject) => {
                req.session.destroy(err => {
                    if (err) reject(err);
                    else resolve(true);
                });
            });
            res.status(200).json({ message: 'Session destroyed successfully' });
        } else {
            res.status(404).json({ error: 'Session not found' });
        }
    } catch (err) {
        console.error('Error checking session status:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

// Route for user signup
router.post('/signup', async (req: Request, res: Response) => {
    const { firstName, lastName, username, pwd } = req.body;

    try {
        const currUser = await userController.findUserByEmail(username);
        if (currUser) {
            return res.status(409).json({ message: 'User already exists with this email.' });
        }

        const user = await userController.signup(firstName, lastName, username, pwd);
        if (user) {
            doLogin(user, req, res);
            return res.status(201).json({ message: 'User created successfully.' });
        } else {
            return res.json({ message: "Cannot find new user" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

// Route for user login
router.post('/login', async (req: Request, res: Response) => {
    const { username, pwd } = req.body;

    try {
        const user = await userController.login(username, pwd);
        if (user) {
            doLogin(user, req, res);
            return res.json({ message: 'Logged in successfully' });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

// Route for resetting password
router.post('/reset_password', async (req: Request, res: Response) => {
    const { username, old_pwd, new_pwd, new_pwd_match } = req.body;

    try {
        const currUser = await userController.findUserByEmail(username);
        if (currUser) {
            const isPasswordValid = await bcrypt.compare(old_pwd, currUser.password);

            if (isPasswordValid) {
                if (checkPasswords(new_pwd, new_pwd_match)) {
                      // Fetch the number of salt rounds from environment variables
                    const saltRounds = parseInt(process.env["BCRYPT_SALT_ROUNDS"] || '10', 10);
                    const hashedPassword = await bcrypt.hash(new_pwd, saltRounds);
                    const currUserId = currUser.id.toString();

                    await userController.updateUserPassword(hashedPassword, currUserId);
                    return res.json({ message: "The password updated successfully" });
                } else {
                    return res.json({ message: "The passwords don't match" });
                }
            } else {
                return res.json({ message: "The old password you entered is invalid" });
            }
        } else {
            return res.json({ message: "User does not exist" });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});

router.delete('/delete_account', async (req: Request, res: Response) => {
    const session_user_id = req.session.id;

    try{
        doLogout(req, res);
        await cardController.deleteCards();
        await listController.deleteLists();
        await userController.deleteAccount(session_user_id);
        return res.json({ message: 'User account and information successfully deleted' });
    } catch (error) {
        return res.json({ message: 'Unable to delete user account or information' });
    }
});

// Route for user logout
router.get('/logout', (req: Request, res: Response) => {
    doLogout(req, res);
});

export default router;
