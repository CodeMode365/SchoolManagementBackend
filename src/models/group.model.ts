import { Schema, model } from 'mongoose';

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: false,
    },
    lead: {
      type: Schema.Types.ObjectId,
      ref: ['Staff', 'Student', 'Teacher', 'User'],
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: ['Staff', 'Student', 'Teacher', 'User'],
      },
    ],
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
  },
  { timestamps: true }
);

const Group = model('Group', groupSchema);

export default Group;
