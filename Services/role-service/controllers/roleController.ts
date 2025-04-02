import { Request, Response } from "express";
import {
  sendErrorResponse,
  sendSuccessResponse,
} from "../../shared/utilities/Response";
import { IRoleService } from "role-service/interfaces/IRoleService";
import { IRole } from "role-service/interfaces/IRole";
// Dependency Injection Pattern
// Injecting an instance of IRoleService into each route handler function
// Allows for easier mock testing/ swapping of user service if needed

// Service Layer pattern
// business logic abstracts away from controllers via IRoleService interface
// and implemented by RoleService

export class RoleController {
  private static instance: RoleController;

  roleService: IRoleService;
  private constructor(roleService: IRoleService) {
    this.roleService = roleService;
  }
  public static getInstance(roleService: IRoleService): RoleController {
    if (!RoleController.instance) {
      RoleController.instance = new RoleController(roleService);
    }
    return RoleController.instance;
  }
  public getRolesByEvent = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { eventID } = req.params;
    try {
      const roles: IRole[] = await this.roleService.fetchRolesByEvent(eventID);
      sendSuccessResponse(res, "Successfully fetched roles list.", roles, 200);
    } catch (error) {
      sendErrorResponse(res, "Failed to fetch roles list.", error, 500);
    }
  };

  public getUserRolesByEvent = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { eventID, userID } = req.params;
    try {
      const userRoles: IRole = await this.roleService.fetchUserRolesByEvent(
        userID,
        eventID
      );
      sendSuccessResponse(
        res,
        "Successfully fetched user details.",
        userRoles,
        200
      );
    } catch (error) {
      sendErrorResponse(res, "Failed to fetch user roles.", error, 404);
    }
  };

  public createUserRoles = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const roleData = req.body;
    try {
      const userRoles = await this.roleService.addRole(roleData);
      sendSuccessResponse(
        res,
        "Successfully created user roles.",
        userRoles,
        201
      );
    } catch (error) {
      sendErrorResponse(res, "Failed to create user roles.", error, 500);
    }
  };

  public assignUserRole = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { userID, eventID, role } = req.body;
    try {
      const updatedUserRoles = await this.roleService.assignRoleToUserByEvent(
        userID,
        eventID,
        role
      );
      sendSuccessResponse(
        res,
        "Successfully updated user roles.",
        updatedUserRoles,
        200
      );
    } catch (error) {
      sendErrorResponse(res, "Failed to update user roles.", error, 500);
    }
  };
  public unassignUserRole = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { userID, eventID, role } = req.body;
    try {
      const updatedUserRoles =
        await this.roleService.unassignRoleFromUserByEvent(
          userID,
          eventID,
          role
        );
      sendSuccessResponse(
        res,
        "Successfully updated user roles.",
        updatedUserRoles,
        200
      );
    } catch (error) {
      sendErrorResponse(res, "Failed to update user roles.", error, 500);
    }
  };
  public removeUserRoles = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { userID, eventID } = req.params;
    try {
      const deleted = await this.roleService.removeAllRolesForUserByEvent(
        userID,
        eventID
      );
      sendSuccessResponse(
        res,
        "Successfully deleted user roles.",
        deleted,
        200
      );
    } catch (error) {
      sendErrorResponse(res, "Failed to delete user roles.", error, 500);
    }
  };
}

export default RoleController;
