import { Document } from "mongoose";

export default interface Users extends Document{
    fullname:string;
    email:string,
    password:string,
    role:string,

    isValidPassword(password:string):Promise<Error | boolean>;
}