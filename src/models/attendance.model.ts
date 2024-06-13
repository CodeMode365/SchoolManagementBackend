import { AttendanceStatusType } from '@/config/enums.config';
import type { AttendanceSchemaType } from '@/types/model';
import { model, Schema } from 'mongoose';

const attendanceSchema = new Schema<AttendanceSchemaType>(
  {
    status: {
      type: String,
      enum: AttendanceStatusType,
      default: AttendanceStatusType.PRESENT,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

const Attendance = model('Attendance', attendanceSchema);

export default Attendance;
