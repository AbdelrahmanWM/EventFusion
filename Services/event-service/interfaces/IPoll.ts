import { Document } from "mongoose";

export interface IPoll extends Document {
  eventID: string; 
  question: string;
  options: Array<{
    option: string;
    votes: number;
  }>;
  isOpen: Boolean;
  createdAt: Date;
  expiresAt: Date;
}