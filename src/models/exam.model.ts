import { model, Schema } from 'mongoose';

const examSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    students: [
      //includes many students
      {
        type: Schema.Types.ObjectId,
        ref: 'Student',
      },
    ],
    results: [
      //has many students result
      {
        type: Schema.Types.ObjectId,
        ref: 'Result',
      },
    ],
  },
  { timestamps: true }
);

const Exam = model('Exam', examSchema);

export default Exam;
