import { Role } from "role_service/enums/role";
import { IRole } from "./IRole";

export interface IRoleService {
  fetchRolesByEvent(eventID: string): Promise<IRole[]>;
  fetchUserRolesByEvent(
    username: string,
    eventID: string
  ): Promise<IRole[] | null>;
  addRole(roleData: IRole): Promise<IRole>;
  assignRoleToUserByEvent(
    username: string,
    eventID: string,
    role: Role
  ): Promise<IRole | null>;
  unassignRoleFromUserByEvent(
    username: string,
    eventID: string,
    role: Role
  ): Promise<IRole | null>;
  removeAllRolesForUserByEvent(
    username: string,
    eventID: string
  ): Promise<IRole | null>;
}
