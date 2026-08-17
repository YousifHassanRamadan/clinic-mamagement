import { z } from "zod";

export const updateQuestionSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),

  question: z.string().trim().min(1, "Question is required"),

  options: z.array(
    z.object({
      id: z.string().optional(),

      text: z.string().trim().min(1, "Option text is required"),

      points: z.number().int("Points must be a whole number"),

      order: z.number().int().positive(),
    }),
  ),
});

export const createQuestionOptionSchema = z.object({
  questionId: z.string().min(1, "Question ID is required"),

  text: z.string().trim(),

  points: z.number().int("Points must be a whole number"),
});

export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;

export type CreateQuestionOptionInput = z.infer<
  typeof createQuestionOptionSchema
>;
