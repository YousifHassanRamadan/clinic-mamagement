"use server";

import { prisma } from "@/lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.testCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            tests: true,
          },
        },
      },
    });

    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    console.error("GET_CATEGORIES_ERROR:", error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch categories",
    };
  }
}

export async function getCategoryById(categoryId: string) {
  if (!categoryId) {
    return {
      success: false,
      data: null,
      message: "Category ID is required",
    };
  }

  try {
    const category = await prisma.testCategory.findUnique({
      where: {
        id: categoryId,
      },
      select: {
        id: true,
        name: true,
        description: true,
      },
    });

    if (!category) {
      return {
        success: false,
        data: null,
        message: "Category not found",
      };
    }

    return {
      success: true,
      data: category,
    };
  } catch (error) {
    console.error("GET_CATEGORY_ERROR:", error);

    return {
      success: false,
      data: null,
      message: "Failed to fetch category",
    };
  }
}

export type CategoryWithCount = {
  id: string;
  name: string;
  description: string | null;
  _count: {
    tests: number;
  };
};
