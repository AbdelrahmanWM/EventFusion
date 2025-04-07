import { Role } from "role-service/enums/role";
import { IRole } from "role-service/interfaces/IRole";
import { IRoleService } from "role-service/interfaces/IRoleService";
import Roles from "role-service/models/Role";

/**
 * Singleton design pattern:
 * Only one instance of Role service is needed
 */
class RoleService implements IRoleService {
  static instance: RoleService | null = null;
  private constructor() {}

  public static getInstance(): RoleService {
    if (!RoleService.instance) {
      RoleService.instance = new RoleService();
    }
    return RoleService.instance;
  }
  async fetchRolesByUser(userID: string): Promise<IRole[]> {
    try {
      const roles: IRole[] = await Roles.find({ user: userID });
      if (roles.length == 0) {
        throw new Error(`No roles found for user: ${userID}.`);
      }
      return roles;
    } catch (error: any) {
      throw new Error(`Failed to fetch roles: ${error.message}`);
    }
  }
  async fetchRolesByEvent(eventID: string): Promise<IRole[]> {
    try {
      const roles: IRole[] = await Roles.find({ event: eventID });
      if (roles.length == 0) {
        throw new Error(`No roles found for ${eventID}.`);
      }
      return roles;
    } catch (error: any) {
      throw new Error(`Failed to fetch roles: ${error.message}`);
    }
  }
  async fetchUserRolesByEvent(userID: string, eventID: string): Promise<IRole> {
    try {
      const userRoles: IRole | null = await Roles.findOne({
        event: eventID,
        user: userID,
      });
      if (!userRoles) {
        throw new Error(
          `No roles found for user: ${userID} in event: ${eventID}.`
        );
      }
      return userRoles;
    } catch (error: any) {
      throw new Error(`Failed to fetch roles: ${error.message}`);
    }
  }

  async addRole(roleData: IRole): Promise<IRole> {
    try {
      const userRoles = new Roles(roleData);
      await userRoles.save();
      return userRoles;
    } catch (error: any) {
      throw new Error(`Failed to create roles: ${error.message}`);
    }
  }
  async assignRoleToUserByEvent(
    userID: string,
    eventID: string,
    role: Role
  ): Promise<IRole> {
    try {
      const userRoles = await Roles.findOne({
        user: userID,
        event: eventID,
      }).exec();
      if (!userRoles) {
        throw new Error(
          `No roles found for user: ${userID} in event: ${eventID}.`
        );
      }

      if (userRoles.roles.includes(role)) {
        throw new Error(
          `Role ${role} already exists for user: ${userID} in event: ${eventID}.`
        );
      }

      const updatedRoles: IRole = { ...userRoles.toObject() };
      updatedRoles.roles.push(role);

      const updatedUserRoles: IRole | null = await Roles.findByIdAndUpdate(
        userRoles._id,
        updatedRoles,
        { new: true }
      ).exec();
      if (!updatedUserRoles) {
        throw new Error(
          `Failed to update roles: Role document not found for user ${userID} in event ${eventID}.`
        );
      }

      return updatedUserRoles;
    } catch (err: any) {
      throw new Error(
        `Failed to update roles for user: ${userID}, for event: ${eventID}. Error: ${err.message}`
      );
    }
  }

  async unassignRoleFromUserByEvent(
    userID: string,
    eventID: string,
    role: Role
  ): Promise<IRole> {
    try {
      const userRoles = await Roles.findOne({
        user: userID,
        event: eventID,
      }).exec();
      if (!userRoles) {
        throw new Error(
          `No roles found for user: ${userID} in event: ${eventID}.`
        );
      }

      if (!userRoles.roles.includes(role)) {
        throw new Error(
          `Role ${role} doesn't exist for user: ${userID} in event: ${eventID}.`
        );
      }

      const updatedRoles: IRole = { ...userRoles.toObject() };
      updatedRoles.roles = updatedRoles.roles.filter(
        (element) => element != role
      );

      const updatedUserRoles: IRole | null = await Roles.findByIdAndUpdate(
        userRoles._id,
        updatedRoles,
        { new: true }
      ).exec();
      if (!updatedUserRoles) {
        throw new Error(
          `Failed to update roles: Role document not found for user ${userID} in event ${eventID}.`
        );
      }

      return updatedUserRoles;
    } catch (err: any) {
      throw new Error(
        `Failed to update roles for user: ${userID}, for event: ${eventID}. Error: ${err.message}`
      );
    }
  }
  async removeAllRolesForUserByEvent(
    userID: string,
    eventID: string
  ): Promise<IRole> {
    try {
      const userRoles: IRole | null = await Roles.findOneAndDelete({
        user: userID,
        event: eventID,
      }).exec();
      if (!userRoles) {
        throw new Error("User role not found");
      }
      return userRoles;
    } catch (error: any) {
      throw new Error(`Failed to delete user roles: ${error.message}`);
    }
  }
}

export default RoleService;
