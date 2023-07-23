import { createToken } from "../../utils/token";
import Users from "./users.interface";
import usersModel from "./users.model";

class UserService {
  private User = usersModel;

  /**
   * New User Register
   */
  public register = async (body: Users): Promise<string | Error> => {
    const { fullname, email, password } = body;
    try {
      const prevUser = await this.User.findOne({ email });
  
      if (prevUser) {
        throw new Error("Email Already Exists");
      }
  
      const user = await this.User.create({ fullname, email, password });
      const accessToken = createToken(user);
      return accessToken;
    } catch (error: any) {
      console.log(error);
      return error.message
    }
  };
  

  /**
   * User Login
   */
  public login = async (body: Users): Promise<string | Error> => {
    const { email, password } = body;
    try {
      const user = await this.User.findOne({ email });
  
      if (!user) {
        throw new Error("User not found.");
      }
  
      if (await user.isValidPassword(password)) {
        // Password is valid, generate and return the access token
        const accessToken = createToken(user);
        return accessToken;
      } else {
        throw new Error("Invalid password.");
      }
    } catch (error: any) {
      console.log(error);
      throw new Error("Login failed.");
    }
  };
}

export default UserService