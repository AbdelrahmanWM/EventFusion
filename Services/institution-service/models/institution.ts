import mongoose, { Schema } from "mongoose";
import { IInstitution } from "../interfaces/IInstitution";

const InstitutionSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: false,
    trim: true,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
    },
  ],
  contactInfo: {
    type: String, // Either an email or another string for flexibility
    required: true,
  },
});

const InstitutionModel = mongoose.model<IInstitution>("Institution", InstitutionSchema);

export default InstitutionModel;