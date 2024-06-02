// RESOURCE_ACTION , example: USER_DELETE, USER_BAN
/*
    XYZ : {
        READ: 'XYZ_READ',
        WRITE: 'XYZ_WRITE',
        UPDATE: 'XYZ_UPDATE',
        DELETE: 'XYZ_DELETE'
    }
*/
const PERMISSIONS = {
  STUDENT: {
    READ: 'STUDENT_READ',
    WRITE: 'STUDENT_WRITE',
    UPDATE: 'STUDENT_UPDATE',
    DELETE: 'STUDENT_DELETE',
  },
  TEACHER: {
    READ: 'TEACHER_READ',
    WRITE: 'TEACHER_WRITE',
    UPDATE: 'TEACHER_UPDATE',
    DELETE: 'TEACHER_DELETE',
  },
  PARENT: {
    READ: 'PARENT_READ',
    WRITE: 'PARENT_WRITE',
    UPDATE: 'PARENT_UPDATE',
    DELETE: 'PARENT_DELETE',
  },
  COURSE: {
    READ: 'COURSE_READ',
    WRITE: 'COURSE_WRITE',
    UPDATE: 'COURSE_UPDATE',
    DELETE: 'COURSE_DELETE',
  },
  CLASS: {
    READ: 'CLASS_READ',
    WRITE: 'CLASS_WRITE',
    UPDATE: 'CLASS_UPDATE',
    DELETE: 'CLASS_DELETE',
  },
  ATTENDANCE: {
    READ: 'ATTENDANCE_READ',
    WRITE: 'ATTENDANCE_WRITE',
    UPDATE: 'ATTENDANCE_UPDATE',
    DELETE: 'ATTENDANCE_DELETE',
  },
  GRADE: {
    READ: 'GRADE_READ',
    WRITE: 'GRADE_WRITE',
    UPDATE: 'GRADE_UPDATE',
    DELETE: 'GRADE_DELETE',
  },
  EXAM: {
    READ: 'EXAM_READ',
    WRITE: 'EXAM_WRITE',
    UPDATE: 'EXAM_UPDATE',
    DELETE: 'EXAM_DELETE',
  },
  LOGS: {
    READ: 'LOGS_READ',
    WRITE: 'LOGS_WRITE',
    UPDATE: 'LOGS_UPDATE',
    DELETE: 'LOGS_DELETE',
  },
  BILL: {
    READ: 'BILL_READ',
    WRITE: 'BILL_WRITE',
    UPDATE: 'BILL_UPDATE',
    DELETE: 'BILL_DELETE',
  },
  EVENT: {
    READ: 'EVENT_READ',
    WRITE: 'EVENT_WRITE',
    UPDATE: 'EVENT_UPDATE',
    DELETE: 'EVENT_DELETE',
  },
  GROUP: {
    READ: 'GROUP_READ',
    WRITE: 'GROUP_WRITE',
    UPDATE: 'GROUP_UPDATE',
    DELETE: 'GROUP_DELETE',
  },
  ORGANIZATION: {
    READ: 'ORGANIZATION_READ',
    WRITE: 'ORGANIZATION_WRITE',
    UPDATE: 'ORGANIZATION_UPDATE',
    DELETE: 'ORGANIZATION_DELETE',
  },
  USER: {
    READ: 'USER_READ',
    WRITE: 'USER_WRITE',
    UPDATE: 'USER_UPDATE',
    DELETE: 'USER_DELETE',
  },
  STAFF: {
    READ: 'STAFF_READ',
    WRITE: 'STAFF_WRITE',
    UPDATE: 'STAFF_UPDATE',
    DELETE: 'STAFF_DELETE',
  },
  ADMIN: {
    READ: 'ADMIN_READ',
    WRITE: 'ADMIN_WRITE',
    UPDATE: 'ADMIN_UPDATE',
    DELETE: 'ADMIN_DELETE',
  },
};

const ROLES = {
  STUDENT: 'Student',
  TEACHER: 'Teacher',
  PARENT: 'Parent',
  STAFF: 'Staff',
  SUB_ADMIN: 'SubAdmin',
  ADMIN: 'Admin',
  SUPER_ADMIN: 'SuperAdmin',
};

const EMAIL_TYPES = {
  CONFIRM_EMAIL: 'CONFIRM_EMAIL',
  RESET_PASSWORD: 'RESET_PASSWORD',
};
export { PERMISSIONS, ROLES, EMAIL_TYPES };
