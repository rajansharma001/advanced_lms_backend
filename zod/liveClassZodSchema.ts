import { z } from "zod";
export const LiveClassZodSchema = z.object({
  _id: z.string().optional(),
  topic: z.string(),
  description: z.string(),
  teacherId: z.string(),
  courseId: z.string(),
  classId: z.string(),
  roomId: z.string().optional(),
  status: z
    .enum(["scheduled", "ongoing", "completed", "canclelled"])
    .default("scheduled"),
  startTime: z.string(),
  durationMinutes: z.string(),
  createdAt: z.string().optional(),
});

export type LiveClassType = z.infer<typeof LiveClassZodSchema>;
export enum LiveClassStatus {
  scheduled = "scheduled",
  ongoing = "ongoing",
  completed = "completed",
  canclelled = "canclelled",
}
