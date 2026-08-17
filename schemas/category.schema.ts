import { z } from "zod";
export const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(100, "Category name must be less than 100 characters"),

  description: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

export type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const categoryUpdateSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Category name is required")
    .max(100, "Category name must be less than 100 characters")
    .optional(),

  description: z
    .string()
    .trim()
    .max(500, "Description must be less than 500 characters")
    .optional(),
});

export type CategoryUpdateInput = z.infer<typeof categoryUpdateSchema>;
