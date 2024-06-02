import { PriorityType, StatusType } from '@/config/enums.config';
import { Schema, model } from 'mongoose';

const notificationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  receiver: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  ],
  priority: {
    type: String,
    enum: PriorityType,
    required: true,
  },
  status: {
    type: String,
    enum: StatusType,
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Notification = model('Notification', notificationSchema);

export default Notification;
