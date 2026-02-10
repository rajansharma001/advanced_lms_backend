import mongoose, { Schema } from "mongoose";

const ClassEnrollmentSchema = new mongoose.Schema(
  {
    classId: { type: String },
    courseId: { type: String },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "dropped", "completed"],
      default: "active",
    },
  },
  { timestamps: true },
);

ClassEnrollmentSchema.index({ studentId: 1, classId: 1 }, { unique: true });

export const ClassEnrollmentModel = mongoose.model(
  "ClassEnrollmentModel",
  ClassEnrollmentSchema,
);
