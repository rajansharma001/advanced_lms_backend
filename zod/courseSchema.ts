import { z } from "zod";

/* =========================
   LESSON
========================= */
export const LessonZodSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, "Lesson title is required"),
  slug: z.string().trim().min(3),
  type: z.enum(["video", "text", "pdf", "quiz", "assignment"]),
  videoDuration: z.number().nonnegative().optional(),
  file: z.string().url().optional(),
  resources: z
    .array(
      z.object({
        title: z.string().min(1),
      }),
    )
    .optional(),
  textContent: z.string().optional(),
  description: z.string().optional(),
  order: z.number().int().nonnegative().default(0),
  isPreview: z.boolean().default(false),
});
//   .superRefine((data, ctx) => {
//     if (data.type === "video" && !data.file) {
//       ctx.addIssue({
//         path: ["file"],
//         message: "Video file is required for video lesson",
//         code: z.ZodIssueCode.custom,
//       });
//     }

//     if (data.type === "text" && !data.textContent) {
//       ctx.addIssue({
//         path: ["textContent"],
//         message: "Text content is required for text lesson",
//         code: z.ZodIssueCode.custom,
//       });
//     }
//   });

/* =========================
   SECTION
========================= */
export const SectionZodSchema = z.object({
  _id: z.string().optional(),
  title: z.string().min(3, "Section title is required"),
  slug: z.string().trim().min(3),
  order: z.number().int().nonnegative().default(0),
  lessons: z.array(LessonZodSchema).default([]),
});

export type SectionType = z.infer<typeof SectionZodSchema>;

/* =========================
   COURSE
========================= */
export const CourseZodSchema = z
  .object({
    _id: z.string().optional(),
    instructorIds: z
      .array(z.string().min(1))
      .nonempty("At least one instructor required"),
    title: z.string().min(3),
    slug: z.string().trim().min(3),
    shortDescription: z.string().min(10),
    fullDescription: z.string().min(20),

    thumbnail: z.string().url().optional(),
    previewVideo: z.string().url().optional().or(z.literal("")),
    courseLevel: z
      .enum(["all", "beginner", "intermediate", "advanced"])
      .default("all"),
    courseLanguage: z.enum(["en", "np"]).default("en"),

    targetAudience: z.array(z.string()).optional(),
    learningOutcomes: z.array(z.string()).min(1),
    prerequisites: z.array(z.string()).optional(),

    courseType: z.enum(["free", "paid"]),
    currency: z.enum(["npr", "usd"]).default("npr"),
    price: z.number().nonnegative().optional(),
    discountPercentage: z.coerce.number().min(0).max(100).optional(),

    courseStatus: z
      .enum(["draft", "review", "published", "trash"])
      .default("draft"),

    approved: z.boolean().default(false),
    enrollmentCount: z.number().int().nonnegative().default(0),

    lastUpdatedBy: z.string().optional(),

    sections: z.array(SectionZodSchema).default([]),
    createdAt: z.preprocess((arg) => {
      if (typeof arg === "string" && arg.length === 0) return undefined;
      return arg;
    }, z.coerce.date().optional()),
  })
  .superRefine((data, ctx) => {
    if (data.courseType === "paid" && (!data.price || data.price <= 0)) {
      ctx.addIssue({
        path: ["price"],
        message: "Price is required for paid courses",
        code: z.ZodIssueCode.custom,
      });
    }

    if (data.discountPercentage && !data.price) {
      ctx.addIssue({
        path: ["discountPercentage"],
        message: "Discount cannot exist without price",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type CourseType = z.infer<typeof CourseZodSchema>;
/* =========================
   Q & A
========================= */
export const QandAZodSchema = z.object({
  courseId: z.string(),
  question: z.string().min(5),
  answer: z.string().optional(),
});

/* =========================
   MESSAGE
========================= */
export const MessageZodSchema = z.object({
  courseId: z.string(),
  lessonId: z.string(),
  userId: z.string(),
  message: z.string().min(1),
  file: z.string().url().optional(),
});
