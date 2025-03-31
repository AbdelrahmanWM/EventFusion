import { IUser } from "./IUser";


export interface IAuthService {
    generateToken(user: IUser): string;
}


