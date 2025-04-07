import { Document } from "mongoose";

export interface IInstitution extends Document {
  name: string;
  description: string;
  members: string[]; 
  contactInfo: string; 
}