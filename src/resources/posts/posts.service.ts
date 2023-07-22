import Post from "./posts.interface";
import postsModel from "./posts.model";

class PostService {
  private posts = postsModel;

  /**
   * Creating New Post
   */
  public async createPost(body: Post): Promise<Post> {
    try {
        console.log("service");
      return await this.posts.create(body);
    } catch {
      throw new Error("Cannot Create Post");
    }
  }
}

export default PostService;
