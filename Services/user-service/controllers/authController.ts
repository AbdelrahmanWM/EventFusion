import { Request, Response } from "express";
import { IUserService } from "../interfaces/IUserService";
import { IAuthService } from "../interfaces/IAuthService";
import { IUser } from "../interfaces/IUser";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../common-utilities/Response";

export class AuthController {
  private static instance: AuthController;
  userService: IUserService;
  authService: IAuthService;
  private constructor(userService: IUserService, authService: IAuthService) {
    this.userService = userService;
    this.authService = authService;
  }
  public static getInstance(
    userService: IUserService,
    authService: IAuthService
  ): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController(userService, authService);
    }
    return AuthController.instance;
  }

  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
      const user: IUser | null = await this.userService.getUserByUsername(
        username
      );
      if (
        !user ||
        !this.userService.comparePasswords(password, user.password)
      ) {
        return sendErrorResponse(res, "Invalid credentials", "", 401);
      }
      const token = this.authService.generateToken(user as IUser);
      return sendSuccessResponse(
        res,
        "Successfully logged in user.",
        { token },
        200
      );
    } catch (error: any) {
      sendErrorResponse(res, "Failed to login user.", error.message, 404);
    }
  };
}
