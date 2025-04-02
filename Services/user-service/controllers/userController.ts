import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../shared/utilities/Response";
import { IUserService } from "../interfaces/IUserService";

// Dependency Injection Pattern
// Injecting an instance of IUserService into each route handler function
// Allows for easier mock testing/ swapping of user service if needed

// Service Layer pattern
// business logic abstracts away from controllers via IUserService interface
// and implemented by UserService

export class UserController {
  private static instance: UserController;

  userService: IUserService;
  private constructor(userService: IUserService) {
    this.userService = userService;
  }
  public static getInstance(userService: IUserService): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController(userService);
    }
    return UserController.instance;
  }
  public user_list = async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await this.userService.getUserList();
      sendSuccessResponse(res, "Successfully fetched users list.", users, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to fetch users list.", error, 500);
    }
  };

  public user_detail = async (req: Request, res: Response): Promise<void> => {
    const { username } = req.params;
    try {
      const user = await this.userService.getUserByUsername(username);
      sendSuccessResponse(res, "Successfully fetched user details.", user, 200);
    } catch (error) {
      sendErrorResponse(res, "User not found.", error, 404);
    }
  };

  public user_create = async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;
    try {
      const user = await this.userService.createUser(userData);
      sendSuccessResponse(res, "Successfully created the user.", user, 201);
    } catch (error) {
      sendErrorResponse(res, "Failed to create user.", error, 500);
    }
  };

  public user_update = async (req: Request, res: Response): Promise<void> => {
    const updates = req.body;
    const username = req.params.username;
    try {
      const user = await this.userService.updateUser(username, updates);
      sendSuccessResponse(res, "Successfully updated user details.", user, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to update user.", error, 500);
    }
  };

  public user_delete = async (req: Request, res: Response): Promise<void> => {
    const username = req.params.username;
    try {
      const user = await this.userService.deleteUser(username);
      sendSuccessResponse(res, "Successfully deleted the user.", user, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to delete user.", error, 500);
    }
  };
}

export default UserController;
