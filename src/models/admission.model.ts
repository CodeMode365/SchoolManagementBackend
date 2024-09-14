import { GenderType, RegistrationStatusType } from '@/config/enums.config';
import type { AdmissionSchemeType } from '@/types/model';
import { Schema, model } from 'mongoose';

const admissionSchema = new Schema<AdmissionSchemeType>({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
  },
  middleName: {
    type: String,
    required: [false, 'Please provide middle name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
  },
  dateOfBirth: {
    type: Date,
    required: [true, 'Please provide date of birth'],
  },
  gender: {
    type: String,
    enum: GenderType,
    required: [true, 'Please provide gender'],
  },
  address: {
    city: String,
    tole: String,
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
  },
  parents: [{ type: Schema.Types.ObjectId, ref: 'Parent' }],
  previousSchool: {
    name: String,
    location: String,
  },
  class: {
    type: Schema.Types.ObjectId,
    ref: 'Class',
  },
  status: {
    type: String,
    enum: RegistrationStatusType,
    default: RegistrationStatusType.PENDING,
  },
  organization: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: [true, 'Please provide organization'],
  },
});

admissionSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.middleName} ${this.lastName}`;
});

admissionSchema.index({
  fullName: 'text',
  firstName: 'text',
  middleName: 'text',
  lastName: 'text',
});

const Admission = model<AdmissionSchemeType>('Admission', admissionSchema);
export default Admission;
