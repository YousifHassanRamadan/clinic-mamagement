"use server";

import { prisma } from "@/lib/prisma";

export async function deleteCategory(categoryId: string) {
  if (!categoryId) {
    return {
      success: false,
      message: "Category ID is required",
    };
  }

  try {
    const category = await prisma.testCategory.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    await prisma.testCategory.delete({
      where: {
        id: categoryId,
      },
    });

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    console.error("DELETE_CATEGORY_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete category",
    };
  }
}
