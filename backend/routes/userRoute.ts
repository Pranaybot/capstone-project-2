import { Router, Request, Response } from 'express';
import { UserController } from '../controllers/userController';
import signUpmiddleware  from "../middleware/signUpmiddleWare";
import loginMiddleware from "../middleware/loginMiddleware";
import { Application } from 'express-serve-static-core';
import app from "../server";

const router = Router();
const userController = new UserController();

function do_login(user: any, app: Application) {
    app.locals.user_id = user.id;
};

function do_logout() {
    delete app.locals.user_id
}


router.post('/signup', signUpmiddleware, async (req: Request, res: Response) => {
    const { firstname, lastname, username, pwd } = req.body;

    try {
        const user = await userController.signup(firstname, lastname, username, pwd);
        if (user) {
            do_login(user, app);
            res.redirect("/work_area");
        }
    } catch (error) {
        console.error('Failed to create user', error);
        res.send(`
            <script>
                localStorage.setItem('error', ${JSON.stringify(error.message)});
                window.location.href = '/login_signup';
            </script>
        `);
    }
});

router.post('/login', loginMiddleware, async (req: Request, res: Response) => {
    const { username, pwd } = req.body;

    try {
        const user = await userController.login(username, pwd);
        if (user) {
          // Redirect to work_area Angular component on successful login
          do_login(user, app);
          res.redirect('/work_area');
        } 
    } catch (error) {
        console.error('Invalid username or password', error);
        res.send(`
            <script>
                localStorage.setItem('error', ${JSON.stringify(error.message)});
                window.location.href = '/login_signup';
            </script>
        `);
    }
});

router.get('/logout', (req: Request, res: Response) => {
    do_logout();
    res.redirect("/")
})

export default router;
