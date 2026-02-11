import { email, z } from "zod";

export const InstitutionSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string(),
  logo: z.string().optional(),
  address: z.string(),
  status: z.enum(["active", "inactive", "suspended"]).default("active"),
  socialLinks: z
    .object({
      facebook: z.string().url().optional(),
      instagram: z.string().url().optional(),
      tiktok: z.string().url().optional(),
      twitter: z.string().url().optional(),
      youtube: z.string().url().optional(),
      website: z.string().url().optional(),
    })
    .optional(),
});

export type InstitutionType = z.infer<typeof InstitutionSchema>;
