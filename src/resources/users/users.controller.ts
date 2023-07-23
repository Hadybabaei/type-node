import validationMiddleware from "../../middleware/validation.middleware";
import HttpExceptions from "../../utils/exceptions/http.exceptions";
import { NextFunction, Request, Response, Router } from "express";
import userDto from "./user.dto";
import UserService from "./users.service";
import authenticationMiddleware from "../../middleware/authentication.middleware";

class UserController {
  private _userService = new UserService();
  public path = "/users";
  public router = Router();

  constructor() {
    this.initializeRouter();
  }

  private initializeRouter(): void {
    this.router.post(
      "/register",
      validationMiddleware(userDto.register),
      this.register
    );
    this.router.post("/login", validationMiddleware(userDto.login), this.login);
    this.router.get(`${this.path}`,authenticationMiddleware,this.getUser)
  }

  private register = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const token = await this._userService.register(req.body);
      if (typeof token === "string") {
        next(new HttpExceptions(409, token));
      }
      res.status(201).json({ Message: "Account Created Successfully", token });
    } catch (error: any) {
      next(new HttpExceptions(500, "unable Create User"));
    }
  };

  private login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const token = await this._userService.login(req.body);
      res
        .status(200)
        .json({ Message: "User Logined Successfuly", Success: true, token });
    } catch (error: any) {
      console.log(error);
      next(new HttpExceptions(500, error.message));
    }
  };

  private getUser = (
    req: Request,
    res: Response,
    next: NextFunction
): Response | void => {
    if (!req.user) {
        return next(new HttpExceptions(404, 'No logged in user'));
    }

    res.status(200).send({ data: req.user });
};
}

export default UserController;
