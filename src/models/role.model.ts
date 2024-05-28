import { AccountType } from '@/config/enums.config';
import type { RoleType } from '@/types/model';
import { Schema, model } from 'mongoose';

const roleSchema = new Schema<RoleType>(
  {
    name: {
      type: String,
      enum: AccountType,
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

export default Role;
