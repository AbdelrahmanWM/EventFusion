import mongoose, { Schema } from "mongoose";
import { IFeedback } from "../interfaces/IFeedback";

const FeedbackSchema: Schema = new Schema({
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event", 
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, 
    max: 5, 
  },
  comment: {
    type: String,
    trim: true,
    required: false, 
  },
  createdAt: {
    type: Date,
    default: Date.now, 
  },
});

const FeedbackModel = mongoose.model<IFeedback>("Feedback", FeedbackSchema);

export default FeedbackModel;