import type { FileSchemaType, MessageSchemaType } from '@/types/model';
import { model, Schema } from 'mongoose';

const fileSchema = new Schema<FileSchemaType>(
  {
    filename: { type: String, required: true },
    url: { type: String, required: true },
    mimetype: { type: String },
    size: { type: Number },
  },
  { _id: false }
);

const messageSchema = new Schema<MessageSchemaType>(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    files: [fileSchema],
  },
  { timestamps: true }
);

const Message = model('Message', messageSchema);

export default Message;
