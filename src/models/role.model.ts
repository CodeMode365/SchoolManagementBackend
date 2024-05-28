import type { RoleType } from '@/types/model';
import { Schema, model } from 'mongoose';

const roleSchema = new Schema<RoleType>(
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
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Permission',
      },
    ],
  },
  { timestamps: true }
);

const Role = model('Role', roleSchema);

module.exports = Role;
