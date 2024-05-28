import { Schema, model } from 'mongoose';
import type { EventType } from '@/types/model';
import { EventStatusType } from '@/constants/enums';

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
      //has one creator
      type: Schema.Types.ObjectId,
      ref: ['User', 'Staff'],
      required: true,
    },
    organizer: {
      //has one organization
      type: Schema.Types.ObjectId,
      required: 'Organization',
    },
  },
  {
    timestamps: true,
  }
);

const Event = model('Event', eventSchema);

export default Event;
