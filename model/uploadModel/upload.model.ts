import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    originalName: { type: String },
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    size: { type: Number },
    mimeType: { type: String },
    resource_type: {
      type: String,
      enum: ["image", "video", "raw"],
      required: true,
    },
    // Cloudinary provides a unique 'etag' (MD5 hash) for every file
    etag: { type: String, required: true, index: true },
  },
  {
    timestamps: true,
  }
);

export const UploadModel = mongoose.model("UploadModel", UploadSchema);
