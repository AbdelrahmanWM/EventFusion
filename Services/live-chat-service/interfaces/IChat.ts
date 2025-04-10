import { Document } from "mongoose";

export interface IChat extends Document {
  eventID: string; /// reference to events schema
  comments: Array<{
    username: string;
    userID: string|any; // reference to users schema;
    comment: string;
    date: Date;
    isHidden: boolean;
  }>;
}
