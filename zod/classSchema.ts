import { z } from "zod";

export const classSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(3, "Class name must be at least 3 characters"),
  code: z.string().optional(),
  description: z.string().optional(),
  instructorIds: z
    .array(z.string().min(1))
    .nonempty("At least one instructor required"),
  status: z.enum(["active", "inactive", "archived"]).default("active"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type ClassType = z.infer<typeof classSchema>;

export enum Status {
  inactive = "inactive",
  active = "active",
  archived = "archived",
}
