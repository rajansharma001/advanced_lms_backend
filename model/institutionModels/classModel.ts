import { Schema, model } from "mongoose";

const ClassSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, unique: true },
    description: { type: String },
    instructorIds: [
      { type: Schema.Types.ObjectId, ref: "UserModel", required: true },
    ],
    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const ClassModel = model("Class", ClassSchema);
