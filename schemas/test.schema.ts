import { z } from "zod";

export const createTestSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, "Test title is required")
      .max(200, "Test title must be less than 200 characters"),

    titleAr: z
      .string()
      .trim()
      .max(200, "Arabic test title must be less than 200 characters")
      .optional(),

    description: z
      .string()
      .trim()
      .max(1000, "Description must be less than 1000 characters")
      .optional(),

    descriptionAr: z
      .string()
      .trim()
      .max(1000, "Arabic description must be less than 1000 characters")
      .optional(),

    categoryId: z.string().min(1, "Please select category"),

    price: z
      .number()
      .min(0, "Price cannot be negative")
      .max(99999999.99, "Price is too large"),

    isActive: z.boolean(),

    ranges: z
      .array(
        z.object({
          minScore: z.number().min(0, "Minimum score is required"),
          maxScore: z.number().min(0, "Maximum score is required"),

          result: z.string().trim().min(1, "Result is required"),

          resultAr: z.string().trim().optional(),
        }),
      )
      .min(1, "At least one score range is required"),
  })
  .superRefine((data, ctx) => {
    const ranges = data.ranges;

    for (let i = 0; i < ranges.length; i++) {
      const current = ranges[i];

      if (current.minScore > current.maxScore) {
        ctx.addIssue({
          code: "custom",
          path: ["ranges", i, "minScore"],
          message: "Minimum score must be less than or equal to maximum score",
        });
      }

      for (let j = i + 1; j < ranges.length; j++) {
        const other = ranges[j];

        const hasOverlap =
          current.minScore <= other.maxScore &&
          current.maxScore >= other.minScore;

        if (hasOverlap) {
          ctx.addIssue({
            code: "custom",
            path: ["ranges", j, "minScore"],
            message: `This range overlaps with range ${i + 1}`,
          });
        }
      }
    }
  });

export type CreateTestInput = z.infer<typeof createTestSchema>;
