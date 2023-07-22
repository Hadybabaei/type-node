import { Document } from "mongodb";

export default interface Post extends Document{
    title:string,
    body:string
}