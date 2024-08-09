import { PriorityType, StatusType } from '@/config/enums.config';
import type { NotificationSchemaType } from '@/types/model';
import { Schema, model } from 'mongoose';

const notificationSchema = new Schema<NotificationSchemaType>({
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
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Notification = model('Notification', notificationSchema);

export default Notification;
