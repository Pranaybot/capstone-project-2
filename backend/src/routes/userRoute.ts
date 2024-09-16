import { Router, Request, Response } from 'express';
import UserController from '../controllers/userController';
import ListController from '../controllers/listController';
import CardController from '../controllers/cardController';
import bcrypt from 'bcryptjs';
import { passwordCheck, loginUser, logoutUser } from "../utils/helpers/user_route_helpers";

const router = Router();
const userController = new UserController();
const listController = new ListController();
const cardController = new CardController();

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
            loginUser(currUser, req, res);
            return res.status(201).json({ message: 'User created successfully.', userId: user.id});
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
            loginUser(user, req, res);
            return res.json({ message: 'Logged in successfully', userId: user.id });
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
                if (passwordCheck(new_pwd, new_pwd_match)) {
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
    const { currUserId } = req.body;

    try{
        await cardController.deleteCards();
        await listController.deleteLists();
        await userController.deleteAccount(currUserId);
        return res.json({ message: 'User account and information successfully deleted' });
    } catch (error) {
        return res.json({ message: 'Unable to delete user account or information' });
    }
});

// Route for user logout
router.get('/logout', (req: Request, res: Response) => {
    logoutUser(req, res);
    res.status(200).json({ message: 'Logged out successfully!' });
});

router.get('/check-auth', (req: Request, res: Response) => {
    try {
      res.json({ isAuthenticated: !!req.session.userId });
    } catch (error) {
      console.error('Error in check-auth route:', error);
      res.status(500).json({ isAuthenticated: false, error: 'Internal server error' });
    }
  });

export default router;
