import { model, Schema } from 'mongoose';

const attendanceSchema = new Schema(
  {
    status: {
      type: String,
      enum: ['Present', 'Absent', 'Late', 'Half'],
      default: 'Present',
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
