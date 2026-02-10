import mongoose, { Document, Schema } from "mongoose";

export interface ILiveClass extends Document {
  topic: string;
  description?: string;
  teacherId: mongoose.Types.ObjectId;
  courseId?: mongoose.Types.ObjectId;
  classId?: mongoose.Types.ObjectId;
  roomId: string;
  status: "scheduled" | "ongoing" | "completed" | "canclelled";
  startTime: Date;
  durationMinutes: number;
  createdAt: Date;
}

const LiveClassSchema = new Schema<ILiveClass>(
  {
    topic: { type: String },
    description: { type: String },
    teacherId: { type: Schema.Types.ObjectId, ref: "UserModel" },
    courseId: { type: String },
    classId: { type: String },
    roomId: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["scheduled", "ongoing", "completed", "canclelled"],
      default: "scheduled",
    },
    startTime: { type: Date },
    durationMinutes: { type: Number, default: 60 },
  },
  { timestamps: true }
);

export const LiveClassModel = mongoose.model<ILiveClass>(
  "LiveClass",
  LiveClassSchema
);
