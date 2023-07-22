import { Request,Response,NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpExceptions from "../../utils/exceptions/http.exceptions";
import PostService from "./posts.service";
import validationMiddleware from '../../middleware/validation.middleware';
import postDTO from './post.dto'
import Post from "./posts.interface";

class PostControler implements Controller{
    public path = "/posts"
    public router = Router();
    private postService = new PostService();
    constructor (){
        this.initializeRouter();
        console.log("New Controller Created");
    }

    private initializeRouter():void{
        this.router.post(`${this.path}`,validationMiddleware(postDTO.create),this.createPost)
    }

    private async createPost(
        req:Request,
        res:Response,
        next:NextFunction
    ):Promise<Post|void>{
        try {
            console.log("controller");
            const body : Post = req.body;
            const post = await this.postService.createPost(body);
            res.status(201).json({Success:true,post})
        }catch{
            next(new HttpExceptions(400,"Cannot Create Post"))
        }
    }
}
export default PostControler