import { EventFormat } from "event-service/enums/eventFormat";
import { EventType } from "event-service/enums/EventType";
import { IEvent } from "event-service/interfaces/IEvent";
import mongoose, { Schema, Document, Model } from "mongoose";

interface IEventDocument extends IEvent, Document {}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    type: { type: String, required: true, enum: Object.values(EventType) },
    format: { type: String, required: true, enum: Object.values(EventFormat) },
    date_time: {
      start: Date,
      end: Date,
      timezone: String,
    },
    location: String,
    agenda: [
      {
        session: String,
        time: Date,
        speaker: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Referencing Speaker
      },
    ],
    registration: {
      period_start: Date,
      period_end: Date,
    },
    stakeholders: [String],
    analytics: {
      total_registered: Number,
    },
  },
  { timestamps: true }
);

const Event: Model<IEventDocument> = mongoose.model<IEventDocument>(
  "Event",
  EventSchema
);
export default Event;
