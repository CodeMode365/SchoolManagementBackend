import type {
  EventStatusType,
  FeeStatusType,
  GenderType,
  PriorityType,
  SubjectType,
} from "@/constants/enums";
import type mongoose, { Document, Schema } from "mongoose";

export interface StudentType extends Document {
  firstName: string;
  lastName: string;
  middleName: string;
  dateOfBirth: Date;
  gender: GenderType;
  address?: {
    city: string;
    tole: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  parent: mongoose.Schema.Types.ObjectId;
  grade: mongoose.Schema.Types.ObjectId;
}

export interface TeacherType extends Document {
  firstName: String;
  middleName?: string;
  lastName: String;
  dateOfBirth: Date;
  gender: GenderType;
  address: {
    city: String;
    tole: String;
  };
  contact: {
    phone: String;
    email: String;
  };
  joinedDate: Date;
  education: String;
  experience: String;
}

export interface ApiLogType extends Document {
  url: string;
  method: string;
  status: number;
  responseTime: number;
  ip: string;
  userAgent: string;
}

export interface BillType extends Document {
  title: string;
  category: string;
  status: FeeStatusType;
  priority: PriorityType;
  description: string;
  createdBy: Schema.Types.ObjectId;
  student: Schema.Types.ObjectId;
}

export interface ClassType extends Document {
  className: string;
  section?: string;
  monitor?: Schema.Types.ObjectId;
  classTeacher: Schema.Types.ObjectId;
  students: [Schema.Types.ObjectId];
}

export interface UserSessionType extends Document {
  user: Schema.Types.ObjectId;
  sessionToken: string;
  createdAt: Date;
  expiresAt?: Date;
}

export interface EventType extends Document {
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: EventStatusType;
  location: string;
  createdBy: Schema.Types.ObjectId;
  organizer: string;
}

export interface ParentType extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  email?: String;
  gender: GenderType;
  address: {
    city: string;
    tole: string;
  };
  contact: {
    phone: string;
    email: string;
  };
  children: Schema.Types.ObjectId[];
}

export interface ResultType extends Document {
  student: Schema.Types.ObjectId;
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

export interface NotificationType extends Document {
  title: string;
  content: string;
  receiver: Schema.Types.ObjectId[];
  priority: PriorityType;
  status?: StatusType;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
}

export interface Url {
  title: string;
  url: string;
}

export interface OrganizationType extends Document {
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  urls: Url[];
  createdAt: Date;
}

export interface UserType extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  password: string;
  role: UserType;
  createdAt: Date;
}

export interface AdminType extends Document {
  firstName: string;
  middleName?: string;
  lastName: string;
  organization: Schema.Types.ObjectId;
  email: string;
  createdAt: Date;
}
