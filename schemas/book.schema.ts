// book.schema.ts

import { z } from "zod";

export const bookSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Book title is required.")
    .max(200, "Book title is too long."),

  titleAr: z
    .string()
    .trim()
    .min(1, "اسم الكتاب بالعربي مطلوب.")
    .max(200, "اسم الكتاب طويل جدًا."),

  description: z
    .string()
    .trim()
    .max(2000, "Description is too long.")
    .optional(),

  descriptionAr: z
    .string()
    .trim()
    .max(2000, "وصف الكتاب طويل جدًا.")
    .optional(),

  price: z.number().min(0, "Price cannot be negative."),

  file: z.instanceof(File).optional(),

  coverImage: z.instanceof(File).optional(),
});

export type BookFormValues = z.infer<typeof bookSchema>;
