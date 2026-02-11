import { z } from "zod";

const Schema = z.object({
  _id: z.string().optional(),
  firstName: z
    .string()
    .min(1, "First name cannot be empty.")
    .max(20, "First name must be at most 20 characters."),

  lastName: z
    .string()
    .min(1, "Last name cannot be empty.")
    .max(20, "Last name must be at most 20 characters."),

  email: z.string().email("Please enter a valid email address."),

  phone: z
    .string()
    .min(10, "Phone number must be exactly 10 digits.")
    .max(10, "Phone number must be exactly 10 digits."),

  profileImage: z.string().url("Profile image must be a valid URL.").optional(),

  role: z.enum(["admin", "instructor", "student"], {}).default("student"),

  isVerified: z.boolean().default(false),
  isActive: z.boolean().default(false),
});

export const UserSchema = Schema.extend({
  password: z.string().min(6, "Password must be at least 6 characters long."),
});

export const UserUpdateSchema = Schema.partial();

export type UserType = z.infer<typeof UserSchema>;
export type UpdateUserType = z.infer<typeof UserUpdateSchema>;

export enum role {
  admin = "admin",
  instructor = "instructor",
  student = "student",
}
