import { z } from "zod";

export const ClassEnrollmentSchema = z.object({
  _id: z.string().optional(),
  classId: z.string().optional(),
  courseId: z.string().optional(),
  studentId: z.string().min(1),
  status: z.enum(["active", "dropped", "completed"]),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ClassEnrollmentType = z.infer<typeof ClassEnrollmentSchema>;
export enum EnrollmentStatus {
  active = "active",
  dropped = "dropped",
  completed = "completed",
}
