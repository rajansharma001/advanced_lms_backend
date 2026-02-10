import mongoose from "mongoose";

const LessonSchema = new mongoose.Schema(
  {
    title: { type: String },
    slug: { type: String },
    type: {
      type: String,
      enum: ["video", "text", "pdf", "quiz", "assignment"],
    },
    videoDuration: { type: Number },
    file: { type: String },
    resources: [{ title: String }],
    textContent: { type: String },
    description: { type: String },
    order: { type: Number, default: 0 },
    isPreview: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const SectionSchema = new mongoose.Schema(
  {
    title: { type: String },
    slug: { type: String },
    order: { type: Number, default: 0 },
    lessons: [LessonSchema],
  },
  { timestamps: true }
);

const CourseSchema = new mongoose.Schema(
  {
    instructorIds: [{ type: mongoose.Types.ObjectId, ref: "UserModel" }],
    title: { type: String },
    slug: { type: String, unique: true },
    shortDescription: { type: String },
    fullDescription: { type: String },
    thumbnail: { type: String },
    previewVideo: { type: String },
    courseLevel: {
      type: String,
      enum: ["all", "beginner", "intermediate", "advanced"],
      default: "all",
    },
    targetAudience: [{ type: String }],
    courseLanguage: { type: String, enum: ["en", "np"], default: "en" },
    learningOutcomes: [{ type: String }],
    prerequisites: [{ type: String }],
    courseType: { type: String, enum: ["free", "paid"] },
    currency: { type: String, enum: ["npr", "usd"] },
    price: { type: Number },
    discountPercentage: { type: Number, min: 0, max: 100 },
    courseStatus: {
      type: String,
      enum: ["draft", "review", "published", "trash"],
      default: "draft",
    },
    approved: { type: Boolean, default: false },
    enrollmentCount: { type: Number },
    lastUpdatedBy: { type: String },
    sections: [SectionSchema],
  },
  {
    timestamps: true,
  }
);

SectionSchema.index({ slug: 1 });
LessonSchema.index({ slug: 1 });

export const CourseModel = mongoose.model("CourseModel", CourseSchema);

const QandASchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Types.ObjectId, ref: "CourseModel" },
    question: { type: String },
    answer: { type: String },
  },
  { timestamps: true }
);

const MessageSchema = new mongoose.Schema(
  {
    courseId: { type: mongoose.Types.ObjectId, ref: "CourseModel" },
    lessonId: { type: mongoose.Types.ObjectId, ref: "LessonModel" },
    userId: { type: mongoose.Types.ObjectId, ref: "UserModel" },
    message: { type: String },
    file: { type: String },
  },
  { timestamps: true }
);

export const QandAModel = mongoose.model("QandAModel", QandASchema);
export const MessageModel = mongoose.model("MessageModel", MessageSchema);
