import { z } from "zod";
export const UploadZodSchema = z.object({
  fileName: z.string(),
  originalName: z.string(),
  url: z.string().url(),
  size: z.number(),
  mimeType: z.string(),
  resource_type: z.enum(["image", "video", "raw"]),
});
