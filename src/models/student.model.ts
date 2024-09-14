import { Schema, model } from 'mongoose';
import { GenderType } from '@/config/enums.config';
import type { StudentSchemaType } from '@/types/model';

const studentSchema = new Schema<StudentSchemaType>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      enum: GenderType,
      required: true,
    },
    address: {
      city: String,
      tole: String,
    },
    phone: {
      type: String,
      required: false,
    },
    parents: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Parent',
      },
    ],
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
    },
    section: {
      type: Schema.Types.ObjectId,
      ref: 'Section',
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    // user: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'User',
    //   required: false,
    // },
  },
  { timestamps: true }
);

studentSchema.index({
  firstName: 'text',
  middleName: 'text',
  lastName: 'text',
  'address.city': 'text',
  'address.tole': 'text',
});

const Student = model('Student', studentSchema);

export default Student;
