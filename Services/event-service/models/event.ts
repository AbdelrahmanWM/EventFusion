import mongoose, { Schema } from "mongoose";
import { IEvent } from "../interfaces/IEvent";

const EventSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  aboutTheEvent: { type: [String], required: true },
  description: { type: String, required: true },
  tags: { type: [String], required: true },
  type: { type: String, required: true },
  format: { type: String, required: true },
  date_time: {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    timezone: { type: String, required: true },
  },
  location: { type: String, required: true },
  pictures:{
    coverPicture:{type: String}
  },
  agenda: [
    {
      title: { type: String, required: true },
      startTime: { type: String, required: true },
      endTime: { type: String, required: true },
      speakers: { type: [String], required: true },
      agenda: { type: String, required: true },
    },
  ],
  streamLink: { type: String, required: false },
  venueInformation: { type: String, required: false },
  registration: {
    period_start: { type: Date, required: true },
    period_end: { type: Date, required: true },
  },
  tickets: [
    {
      name: { type: String, required: true },
      price: { type: Number, required: true },
    },
  ],
  promos: [
    {
      name: { type: String, required: true },
      discount: { type: Number, required: true },
    },
  ],
});

const EventModel = mongoose.model<IEvent>("Event", EventSchema);

export default EventModel;
