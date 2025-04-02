import { Role } from "role-service/enums/role";
export interface IRole {
  user: string;
  event: string;
  roles: Array<Role>;
}
