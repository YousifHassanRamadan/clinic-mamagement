"use server";

import { prisma } from "@/lib/prisma";
import { categoryUpdateSchema } from "@/schemas/category.schema";

export async function updateCategory(categoryId: string, input: unknown) {
  if (!categoryId) {
    return {
      success: false,
      message: "Category ID is required",
    };
  }

  const validation = categoryUpdateSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid category data",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { name, description } = validation.data;

  try {
    const data: {
      name?: string;
      description?: string | null;
    } = {};

    if (name !== undefined) {
      data.name = name;
    }

    if (description !== undefined) {
      data.description = description || null;
    }

    const category = await prisma.testCategory.update({
      where: {
        id: categoryId,
      },
      data,
    });

    return {
      success: true,
      message: "Category updated successfully",
      data: category,
    };
  } catch (error) {
    console.error("UPDATE_CATEGORY_ERROR:", error);

    return {
      success: false,
      message: "Failed to update category",
    };
  }
}
