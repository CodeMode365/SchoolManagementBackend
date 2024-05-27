import { FeeStatusType, PriorityType } from "@/constants/enums";
import type { BillType } from "@/types/model";
import { model, Schema } from "mongoose";

const billSchema = new Schema<BillType>(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: FeeStatusType,
      default: FeeStatusType.UNPAID,
    },
    priority: PriorityType,
    description: {
      type: String,
      required: false,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  },
  { timestamps: true }
);

const Bill = model("Bill", billSchema);

export default Bill;
