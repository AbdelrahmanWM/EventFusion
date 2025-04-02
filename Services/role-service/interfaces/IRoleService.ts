import { Role } from "role-service/enums/role";
import { IRole } from "./IRole";

export interface IRoleService {
  fetchRolesByEvent(eventID: string): Promise<IRole[]>;
  fetchUserRolesByEvent(userID: string, eventID: string): Promise<IRole>;
  addRole(roleData: IRole): Promise<IRole>;
  assignRoleToUserByEvent(
    userID: string,
    eventID: string,
    role: Role
  ): Promise<IRole>;
  unassignRoleFromUserByEvent(
    userID: string,
    eventID: string,
    role: Role
  ): Promise<IRole>;
  removeAllRolesForUserByEvent(userID: string, eventID: string): Promise<IRole>;
}
