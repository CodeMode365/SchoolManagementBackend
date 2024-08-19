import type { ClassSectionType } from '@/types/model';
import { model, Schema } from 'mongoose';

const classSectionSchema = new Schema<ClassSectionType>(
  {
    sectionName: {
      type: String,
      required: true,
      default: 'Default',
    },
    monitor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    classTeacher: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    class: {
      type: Schema.Types.ObjectId,
      ref: 'Class',
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Subject',
      },
    ],
  },
  { timestamps: true }
);

const ClassSection = model('ClassSection', classSectionSchema);
export default ClassSection;
