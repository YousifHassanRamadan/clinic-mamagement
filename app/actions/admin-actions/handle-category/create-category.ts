"use server";

import { prisma } from "@/lib/prisma";
import { createCategorySchema } from "@/schemas/category.schema";

export async function createCategory(input: unknown) {
  const validation = createCategorySchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid category data",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const { name, nameAr, description, descriptionAr } = validation.data;

  try {
    const category = await prisma.testCategory.create({
      data: {
        name,
        nameAr: nameAr || null,
        description: description || null,
        descriptionAr: descriptionAr || null,
      },
    });

    return {
      success: true,
      message: "Category created successfully",
      data: category,
    };
  } catch (error) {
    console.error("CREATE_CATEGORY_ERROR:", error);

    return {
      success: false,
      message: "Failed to create category",
    };
  }
}
