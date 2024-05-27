import mongoose, { Schema, model } from "mongoose";
import type { EventType } from "@/types/model";
import { EventStatusType } from "@/constants/enums";

const eventSchema = new Schema<EventType>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    status: EventStatusType,
    endDate: {
      type: Date,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

export default Event;
