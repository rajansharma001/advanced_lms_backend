import mongoose from "mongoose";
import { string } from "zod";

const InstitutionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
      required: true,
    },
    logo: { type: String },
    socialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      tiktok: { type: String },
      twitter: { type: String },
      youtube: { type: String },
      website: { type: String },
    },
  },
  { timestamps: true }
);

export const InstitutionModel = mongoose.model(
  "InstitutionModel",
  InstitutionSchema
);
