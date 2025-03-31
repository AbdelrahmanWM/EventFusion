import { Role } from "role_service/enums/role";
import { IRole } from "role_service/interfaces/IRole";
import { IRoleService } from "role_service/interfaces/IRoleService";
import Roles from "role_service/models/Role";

/**
 * Singleton design pattern:
 * Only one instance of Role service is needed
 */
class RoleService implements IRoleService {
    static instance: RoleService|null = null;
    private constructor(){}
    public static getInstance(): RoleService{
        if (!RoleService.instance){
            RoleService.instance=new RoleService()
        }
        return RoleService.instance;
    }
    async   fetchRolesByEvent(eventID: string): Promise<IRole[]> {
        try{
            const roles: IRole[] = await Roles.find({event:eventID});
            if(roles.length==0){
                throw new Error(`No roles found for ${eventID}.`)
            }
            return roles;
        }catch(error: any){
            throw new Error(`Failed to fetch roles: ${error.message}`);
        }
    }
    async fetchUserRolesByEvent(username: string, eventID: string): Promise<IRole[] | null> {
        try{
            const roles: IRole[] = await Roles.find({event:eventID});
            if(roles.length==0){
                throw new Error(`No roles found for ${eventID}.`)
            }
            return roles;
        }catch(error: any){
            throw new Error(`Failed to fetch roles: ${error.message}`);
        }
    }
    addRole(roleData: IRole): Promise<IRole> {
        throw new Error("Method not implemented.");
    }
    assignRoleToUserByEvent(username: string, eventID: string, role: Role): Promise<IRole | null> {
        throw new Error("Method not implemented.");
    }
    unassignRoleFromUserByEvent(username: string, eventID: string, role: Role): Promise<IRole | null> {
        throw new Error("Method not implemented.");
    }
    removeAllRolesForUserByEvent(username: string, eventID: string): Promise<IRole | null> {
        throw new Error("Method not implemented.");
    }


   
}

export default RoleService