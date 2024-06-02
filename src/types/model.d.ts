import type {
  AccountStatusType,
  AccountType,
  EventStatusType,
  ExamType,
  FeeStatusType,
  GenderType,
  PriorityType,
  StatusType,
  SubjectType,
} from '@/config/enums.config';
import type mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface StudentSchemaType extends Document {
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: Date;
  gender: GenderType;
  address?: {
    city: string;
    tole: string;
  };
  phone: string;
  parents: mongoose.Types.Array<mongoose.ObjectId>;
  class: ObjectId;
  organization: ObjectId;
  user: ObjectId;
}

export interface TeacherSchemaType extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  dateOfBirth: Date;
  gender: GenderType;
  address: {
    city: string;
    tole: string;
  };
  phone: string;
  email: string;
  user: ObjectId;
  joinedDate: Date;
  education: string;
  experience: string;
  organization: ObjectId;
}

export interface ApiLogSchemaType extends Document {
  url: string;
  method: string;
  status: string;
  responseTime: string;
  ip: string;
  userAgent: string;
  user: ObjectId;
}

export interface BillSchemaType extends Document {
  title: string;
  category: string;
  status: FeeStatusType;
  priority: PriorityType;
  description: string;
  createdBy: ObjectId;
  student: ObjectId;
}

export interface ClassSchemaType extends Document {
  className: string;
  section?: string;
  monitor?: ObjectId;
  classTeacher: ObjectId;
  students: [ObjectId];
  organization: ObjectId;
}

export interface UserSessionSchemaType extends Document {
  user: ObjectId;
  sessionToken: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface EventSchemaType extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: EventStatusType;
  location: string;
  createdBy: ObjectId;
  organizer: ObjectId;
}

export interface ParentSchemaType extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  gender: GenderType;
  address: {
    city: string;
    tole: string;
  };
  phone: string;
  email: string;
  // children: ObjectId[];
  user: ObjectId;
  organization: ObjectId;
}

export interface ResultSchemaType extends Document {
  title: string;
  student: ObjectId;
  subject: SubjectType;
  marks: {
    subject: SubjectType;
    passMark: number;
    fullMark: number;
    obtainedMark: number;
  }[];
  grade: string;
  position: number;
  examDate: Date;
  remarks?: string;
  examType: ExamType;
}

export interface NotificationSchemaType extends Document {
  title: string;
  content: string;
  receiver: ObjectId[];
  priority: PriorityType;
  status?: StatusType;
  createdBy: ObjectId;
  createdAt: Date;
}

export interface Url {
  title: string;
  url: string;
}

export interface OrganizationSchemaType extends Document {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  urls: Url[];
  createdAt: Date;
  classes: ObjectId[];
}

export interface UserSchemaType extends Document {
  username: string;
  email: string;
  password: string;
  roles: Schema.Types.Array<ObjectId>;
  status: AccountStatusType;
}

export interface StaffSchemaType extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  organization: ObjectId;
  user: ObjectId;
  designation: string;
}

export interface AdminSchemaType extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  organization: ObjectId;
  user: ObjectId;
  adminLevel: 'Admin' | 'SubAdmin';
}

export interface RoleSchemaType extends Document {
  name: AccountType;
  description: string;
  permissions: Schema.Types.Array<ObjectId>;
}

export interface TokenSchemaType extends Document {
  token: string;
  user: ObjectId;
}

export interface AttendanceSchemaType extends Document {
  status: AttendanceSchemaType;
  user: ObjectId;
}
