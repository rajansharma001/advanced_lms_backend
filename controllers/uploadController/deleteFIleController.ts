import { Request, Response } from "express";
import { UploadModel } from "../../model/uploadModel/upload.model";
import { v2 as cloudinary } from "cloudinary";

export const deleteFile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const file = await UploadModel.findById(id);

    if (!file) {
      return res.status(404).json({ error: "File not found." });
    }

    console.log("delete file requirest ", file);

    if (file.publicId) {
      const result = await cloudinary.uploader.destroy(file.publicId, {
        resource_type: file.resource_type,
      });
      console.log("Cloudinary delete result:", result);
    }

    await UploadModel.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "File deleted successfully from Cloudinary and Database.",
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
