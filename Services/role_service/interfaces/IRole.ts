import { Role } from "role_service/enums/role";
export interface IRole {
  user: string;
  event: string;
  roles: Array<Role>;
}
