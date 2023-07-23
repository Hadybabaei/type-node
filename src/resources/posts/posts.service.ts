import Post from "./posts.interface";
import postsModel from "./posts.model";

class PostService {
  private posts = postsModel;

  /**
   * Creating New Post
   */
  public async createPost(body: Post): Promise<Post> {
    try {
      return await this.posts.create(body);
    } catch {
      throw new Error("Cannot Create Post");
    }
  }

  /**
   * Get All Posts
   */
  public async getAllPosts(): Promise<Post[]> {
    try {
      const posts = await this.posts.find();
      return posts;
    } catch {
      throw new Error("Cannot Create Post");
    }
  }

  /**
   * Get Post By Id
   */
  public async getPostById(id: string): Promise<Post | null> {
    try {
      const post = await this.posts.findById(id);
      return post;
    } catch (err) {
      console.error(err);
      return null; // Return null if an error occurs or if the post is not found
    }
  }

  /**
   * Update Posts
   */
  public async updatePosts(id: string, dataBody: Post): Promise<Post | null> {
    try {
      const updatedPost = await this.posts.findByIdAndUpdate(id, dataBody, {
        new: true,
      });

      return updatedPost ? updatedPost.toObject() : null;
    } catch (error) {
      console.error("Error in updatePosts:", error);
      return null;
    }
  }

  /**
   * Delete Posts
   */
  public async deletePosts(id: string): Promise<string | null> {
    try {
      await this.posts.findByIdAndDelete(id);
      return `Post ${id} Deleted Successfuly`;
    } catch (error) {
      console.error("Error in updatePosts:", error);
      return null;
    }
  }
}

export default PostService;
