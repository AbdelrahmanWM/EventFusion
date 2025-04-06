import { Document } from "mongoose";

export interface IChat extends Document{
    eventID: string;/// reference to events schema
    comments:{
        username:string;
        userID:string // reference to users schema;
        comment: string;
        date:Date;
        isHidden:boolean;
    }[];
}