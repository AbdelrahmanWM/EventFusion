import { Document } from "mongoose";

export interface IUser extends Document{
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumbe: string;
}