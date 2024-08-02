import type { ClassSectionType } from "@/types/model";
import { model, Schema } from "mongoose";

const classSectionSchema = new Schema<ClassSectionType>(
    {
        sectionName: {
            type: String,
            required: true,
        },
        monitor: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        classTeacher: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        teachers: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        class: {
            type: Schema.Types.ObjectId,
            ref: "Class",
        },
    },
    { timestamps: true }
);

const ClassSection = model("ClassSection", classSectionSchema);
export default ClassSection