import UUID from "./types";

declare module 'express-session' {
    interface SessionData {
        userId: UUID;
        isLoggedIn: boolean;
    }
}
