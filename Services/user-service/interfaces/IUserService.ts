import { IUser } from "./IUser";

export interface IUserService {
    getUserList():Promise<IUser[]>;
    getUserByUsername(username: string):Promise<IUser|null>;
    createUser(userData: IUser):Promise<IUser>;
    updateUser(username: string, updates: Partial<IUser>):Promise<IUser|null>;
    deleteUser(username: String):Promise<IUser|null>;
}
