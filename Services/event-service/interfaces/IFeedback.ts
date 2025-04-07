import { Document } from "mongoose";

export interface IFeedback extends Document {
  eventID: string; 
  userID: string; 
  rating: number; 
  comment: string;
  createdAt: Date;
}