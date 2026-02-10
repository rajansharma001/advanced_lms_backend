import mongoose, { Schema, Document } from "mongoose";

export interface IActivityLog extends Document {
  userId?: mongoose.Types.ObjectId;
  action: string;
  method: string;
  path: string;
  statusCode: number;
  ipAddress?: string;
  userAgent?: string;
  metadata?: any;
  createdAt: Date;
}

const ActivityLogSchema = new Schema<IActivityLog>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true },
    method: { type: String },
    path: { type: String },
    statusCode: { type: Number },
    ipAddress: { type: String },
    userAgent: { type: String },
    metadata: { type: Schema.Types.Mixed },
  },
  { timestamps: true }
);

export const ActivityLogModel = mongoose.model(
  "ActivityLog",
  ActivityLogSchema
);
