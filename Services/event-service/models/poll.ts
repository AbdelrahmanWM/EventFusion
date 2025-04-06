import { IPoll } from "event-service/interfaces/IPoll";
import mongoose, { Schema } from "mongoose";


const PollSchema: Schema = new Schema(
  {
    eventID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event", 
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    isOpen:{type: Boolean, default: true},
    options: [
      {
        option: { type: String, required: true },
        votes: { type: Number, default: 0 },
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now, 
    },
    expiresAt: {
      type: Date,
      required: true, 
    },
  },
  { timestamps: true }
);

const PollModel = mongoose.model<IPoll>("Poll", PollSchema);

export default PollModel;