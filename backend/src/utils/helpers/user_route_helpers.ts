import { Request, Response } from 'express';
import '../session_variables'

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

export const passwordCheck = checkPasswords;
export const loginUser = doLogin;
export const logoutUser = doLogout;
