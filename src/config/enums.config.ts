export enum AccountStatusType {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  BLOCKED = 'Blocked',
  DELETED = 'Deleted',
  PENDING = 'Pending',
}

export enum AttendanceStatusType {
  PRESENT = 'Present',
  ABSENT = 'Absent',
  LEAVE = 'Leave',
  HOLIDAY = 'Holiday',
  SICK_LEAVE = 'Sick Leave',
  HALF_DAY = 'Half Day',
}

export enum AccountType {
  STUDENT = 'Student',
  TEACHER = 'Teacher',
  PARENT = 'Parent',
  ADMIN = 'Admin',
  SUB_ADMIN = 'SubAdmin',
  STAFF = 'Staff',
  SUPER_ADMIN = 'SuperAdmin',
}

export enum ExamType {
  TEST = 'Test',
  EXAM = 'Exam',
  PRACTICAL = 'Practical',
  OTHER = 'Other',
}

export enum EventStatusType {
  RUNNING = 'Running',
  EXPIRED = 'Expired',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
}

export enum NotificationType {
  TOUR = 'Tour',
  PROGRAM = 'Program',
  COMPLAINT = 'Complaint',
  EVENT = 'Event',
  NOTICE = 'Notice',
  MESSAGE = 'Message',
  FEEDBACK = 'Feedback',
  REMINDER = 'Reminder',
  ALERT = 'Alert',
  EMAIL = 'Email',
  SMS = 'SMS',
  CALL = 'Call',
  OTHER = 'Other',
}

export enum FeeStatusType {
  PAID = 'Paid',
  UNPAID = 'Unpaid',
  DUE = 'Due',
}

export enum RegistrationStatusType {
  CONFIRMED = 'Confirmed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
}

export enum PriorityType {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent',
}

export enum PermissionsType {
  READ = 'Read',
  WRITE = 'Write',
  UPDATE = 'Update',
  DELETE = 'Delete',
  EXECUTE = 'Execute',
  ALL = 'All',
}

export enum GenderType {
  MALE = 'Male',
  FEMALE = 'Female',
  OTHER = 'Other',
}

export enum PaymentType {
  CASH = 'Cash',
  CHEQUE = 'Cheque',
  ONLINE = 'Online',
  OTHER = 'Other',
}

export enum SubjectType {
  SCIENCE = 'Science',
  ENGLISH = 'English',
  Nepali = 'Nepali',
  MATHS = 'Maths',
  ART = 'Art',
  MUSIC = 'Music',
  DANCE = 'Dance',
  HISTORY = 'History',
  COMPUTER = 'Computer',
  ECONOMICS = 'Economics',
  GEOGRAPHY = 'Geography',
  ACCOUNT = 'Account',
}

export enum StatusType {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
  DELETED = 'Deleted',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
  EXPIRED = 'Expired',
}

export enum Email_Type {
  RESET_PASSWORD = 'Reset Password',
  ACCOUNT_REGISTRATION = 'Account Registration',
}

export enum TransactionStatusType {
  COMPLETED = 'Completed',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
}
