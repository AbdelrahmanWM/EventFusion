import { Request,Response } from "express";
import { sendErrorResponse,sendSuccessResponse } from "../../common-utilities/Response";
import { IUserService } from "../interfaces/IUserService";

// Dependency Injection Pattern 
// Injecting an instance of IUserService into each route handler function
// Allows for easier mock testing/ swapping of user service if needed


// Service Layer pattern
// business logic abstracts away from controllers via IUserService interface
// and implemented by UserService

/**
 * 
 * @param userService 
 * @returns 
 */
export const user_list = async(userService: IUserService)=>async(req:Request,res:Response): Promise<void> => {
    
    try{
        const users = await userService.getUserList()
        sendSuccessResponse(res,"Successfully fetched users list.", users,200);

    }catch(error){
        sendErrorResponse(res,"Failed to fetch users list.",error,500)
    }
}

export const user_detail = async(userService: IUserService)=>async(req: Request, res: Response): Promise<void>=>{
    const {username} = req.params;
    try{
        const user = await userService.getUserByUsername(username);
        sendSuccessResponse(res,"Successfully fetched user details.",user,200);
    }catch(error){
        sendErrorResponse(res, "User not found.",error,404);
    }
};

export const user_create = async (userService: IUserService)=>async(req: Request, res: Response): Promise<void> => {
    const userData = req.body;
    try {
        const user = await userService.createUser(userData);
        sendSuccessResponse(res, "Successfully created the user.", user, 201);
    } catch (error) {
        sendErrorResponse(res, "Failed to create user.", error, 500);
    }
};

export const user_update = async(userService: IUserService)=>async (req: Request, res: Response): Promise<void> => {
    const updates = req.body;
    const userId = req.params.userId;
    try {
        const user = await userService.updateUser(userId, updates);
        sendSuccessResponse(res, "Successfully updated user details.", user, 200);
    } catch (error) {
        sendErrorResponse(res, "Failed to update user.", error, 500);
    }
};

export const user_delete = async (userService: IUserService)=>async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.userId;
    try {
        const user = await userService.deleteUser(userId);
        sendSuccessResponse(res, "Successfully deleted the user.", user, 200);
    } catch (error) {
        sendErrorResponse(res, "Failed to delete user.", error, 500);
    }
};
