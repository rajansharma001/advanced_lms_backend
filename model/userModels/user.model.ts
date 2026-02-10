import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "instructor", "student"],
      default: "student",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("UserModel", UserSchema);
