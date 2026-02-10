import { Request, Response } from "express";
import { UploadModel } from "../../model/uploadModel/upload.model";
import { v2 as cloudinary } from "cloudinary"; // Make sure to import v2

const getResourceType = (mime: string): "image" | "video" | "raw" => {
  if (mime.startsWith("image/")) return "image";
  if (mime.startsWith("video/")) return "video";
  return "raw"; // pdf, doc, zip, etc.
};

export const fileUpload = async (req: Request, res: Response) => {
  try {
    if (!req.files || !Array.isArray(req.files)) {
      return res.status(400).json({ error: "Files are required." });
    }

    const files = req.files as any[];
    const processedFiles = [];

    for (const file of files) {
      const resourceType = getResourceType(file.mimetype);
      const fileHash = `${file.originalname}_${file.size}`;

      const existingFile = await UploadModel.findOne({ etag: fileHash });

      if (existingFile) {
        // delete duplicate from cloudinary
        await cloudinary.uploader.destroy(file.filename, {
          resource_type: resourceType,
        });

        processedFiles.push(existingFile);
      } else {
        const newFile = await UploadModel.create({
          fileName: file.originalname,
          originalName: file.originalname,
          url: file.path, // secure_url
          publicId: file.filename, // public_id
          resource_type: resourceType, // ✅ REQUIRED
          mimeType: file.mimetype,
          size: file.size,
          etag: fileHash,
        });

        processedFiles.push(newFile);
      }
    }

    return res.status(201).json({
      success: true,
      files: processedFiles,
    });
  } catch (error) {
    console.error("API ERROR!", error);

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files as any[]) {
        const resourceType = getResourceType(file.mimetype);
        await cloudinary.uploader.destroy(file.filename, {
          resource_type: resourceType,
        });
      }
    }

    return res.status(500).json({ error: "Server Error!" });
  }
};

export const getFileUpload = async (req: Request, res: Response) => {
  try {
    const getUploads = await UploadModel.find();
    if (getUploads.length < 1) {
      return res.status(404).json({ error: "Files not found." });
    }
    return res
      .status(200)
      .json({ success: "Files fetched successfully.", getUploads });
  } catch (error) {
    console.log("API ERROR!");
    return res.status(500).json({ error: "API ERROR!" });
  }
};
