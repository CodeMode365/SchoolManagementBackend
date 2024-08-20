import {
  User,
  Role,
  Transaction,
  Permission,
  Admin,
  Admission,
  ApiLog,
  Attendance,
  Bill,
  Class,
  Complaint,
  Event,
  Exam,
  Fee,
  Group,
  Notification,
  Organization,
  Parent,
  Result,
  Session,
  Staff,
  Student,
  Teacher,
  Token,
} from '@/models';
import generateDummyData from './data/DataGenerator';

const useModel = (modelName: string) => {
  switch (modelName.toLowerCase()) {
    case 'user':
      return User;
    case 'role':
      return Role;
    case 'permission':
      return Permission;
    case 'transaction':
      return Transaction;
    case 'admin':
      return Admin;
    case 'admission':
      return Admission;
    case 'apilog':
      return ApiLog;
    case 'attendance':
      return Attendance;
    case 'bill':
      return Bill;
    case 'class':
      return Class;
    case 'complaint':
      return Complaint;
    case 'event':
      return Event;
    case 'exam':
      return Exam;
    case 'fee':
      return Fee;
    case 'group':
      return Group;
    case 'notification':
      return Notification;
    case 'organization':
      return Organization;
    case 'parent':
      return Parent;
    case 'result':
      return Result;
    case 'session':
      return Session;
    case 'staff':
      return Staff;
    case 'student':
      return Student;
    case 'teacher':
      return Teacher;
    case 'token':
      return Token;
    default:
      throw new Error(`Model ${modelName} not found`);
  }
};

const seedData = async (
  modelName: string,
  count?: number,
  propData?: any[]
) => {
  console.log(`##### Seeding ${modelName} with ${count} records ######`);
  try {
    const model = useModel(modelName);
    const data = propData ?? generateDummyData(model, { count });
    await model.insertMany(data);
    console.log(`##### Seed complete for ${modelName} #####`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export { seedData };
