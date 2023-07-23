import Users from "@/resources/users/users.interface";

declare global {
    namespace Express {
        export interface Request {
            user:Users;
        }
    }
}