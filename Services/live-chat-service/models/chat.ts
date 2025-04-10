import mongoose, { Schema } from "mongoose";
import { IChat } from "live-chat-service/interfaces/IChat";

const ChatSchema: Schema = new Schema({
  eventID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  comments: [
    {
      username: {
        type: String,
        required: true,
      },
      userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      isHidden: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

ChatSchema.index({ eventID: 1 });
const ChatModel = mongoose.model<IChat>("Chat", ChatSchema);

export default ChatModel;
