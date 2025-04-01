import { IUser } from "./IUser";

export interface IUserService {
    getUserList():Promise<IUser[]>;
    getUserByUsername(username: string):Promise<IUser>;
    createUser(userData: IUser):Promise<IUser>;
    updateUser(username: string, updates: Partial<IUser>):Promise<IUser>;
    deleteUser(username: String):Promise<IUser>;
    comparePasswords(inputPassword: string, hashedPassword: string):Promise<boolean>;
}
