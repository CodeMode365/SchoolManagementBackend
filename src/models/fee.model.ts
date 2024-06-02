import { model, Schema } from 'mongoose';

const feeSchema = new Schema(
  {
    title: String,
    description: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
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
  },
  {
    timestamps: true,
  }
);

const Fee = model('Fee', feeSchema);

export default Fee;
