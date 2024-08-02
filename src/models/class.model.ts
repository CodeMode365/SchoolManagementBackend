import { Schema, model } from 'mongoose';
import type { ClassSchemaType } from '@/types/model';

const classSchema = new Schema<ClassSchemaType>(
  {
    className: String,
    sections: [
      {
        type: Schema.Types.ObjectId,
        ref: 'ClassSection',
      }
    ],
    organization: {
      //belongs to one organization
      type: Schema.Types.ObjectId,
      ref: 'Organization',
    },
  },
  { timestamps: true }
);

classSchema.index({
  className: 'text',
})

// Create model
const Class = model('Class', classSchema);

export default Class;
