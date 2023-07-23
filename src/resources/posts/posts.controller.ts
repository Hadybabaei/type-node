import { Request, Response, NextFunction, Router } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpExceptions from "../../utils/exceptions/http.exceptions";
import PostService from "./posts.service";
import validationMiddleware from "../../middleware/validation.middleware";
import postDTO from "./post.dto";
import Post from "./posts.interface";

class PostControler implements Controller {
  public path = "/posts";
  public router = Router();
  private _postService = new PostService();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(postDTO.create),
      this.createPost
    );
    this.router.get(`${this.path}`, this.getAllPosts);
    this.router.get(`${this.path}/:id`, this.getPostById);
    this.router.put(
      `${this.path}/:id`,
      validationMiddleware(postDTO.update),
      this.updatePost
    );
    this.router.delete(`${this.path}/:id`, this.deletePost);
  }

  private createPost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const body: Post = req.body;
      const post = await this._postService.createPost(body);
      res.status(201).json({ Success: true, post });
    } catch (err: any) {
      console.log(err);
      next(new HttpExceptions(400, "Cannot Create Post"));
    }
  };

  private getAllPosts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const posts = await this._postService.getAllPosts();
      if (posts.length > 0) res.status(200).json({ Success: true, posts });
      else
        res.status(200).json({ Success: true, posts: "No Post Created Yet" });
    } catch (err: any) {
      console.log(err);
      next(new HttpExceptions(500, "Internal Server Error"));
    }
  };

  private getPostById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const post = await this._postService.getPostById(req.params.id);
      if (post) res.status(200).json({ Success: true, post });
      else res.status(404).json({ Success: false, Message: "Post Not Found!" });
    } catch (err: any) {
      console.log(err);
      next(new HttpExceptions(500, "Internal Server Error"));
    }
  };

  private updatePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response|void> => {
    try {
      const postId = req.params.id;
      const updateData: Post = req.body;

      const updatedPost = await this._postService.updatePosts(
        postId,
        updateData
      );

      if (updatedPost) {
        res.status(200).json(updatedPost);
      } else {
        res.status(404).json({ message: "Post Not Found!" });
      }
    } catch (error) {
      console.error("Error in updatePost:", error);
      next(new HttpExceptions(500, "Internal Server Error"));
    }
  };

  private deletePost = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try{
        const result = await this._postService.deletePosts(req.params.id);
        if (result){
            res.status(200).json({Message:result,Success:true})
        }else{
            res.status(404).json({Message:"Post Not Found",Success:false})
        }
    }catch(error:any){
        console.error("Error in updatePost:", error);
        next(new HttpExceptions(500, "Internal Server Error"));
    }
  };
}
export default PostControler;
