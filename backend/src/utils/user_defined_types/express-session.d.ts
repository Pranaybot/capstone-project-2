import 'express-session';

declare module 'express-session' {
    interface SessionData {
        user_id: string; // or number depending on your user ID type
        isLoggedIn: boolean;
    }
}
