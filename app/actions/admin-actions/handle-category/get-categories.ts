"use server";

import { prisma } from "@/lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.testCategory.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        name: true,
        nameAr: true,
        description: true,
        descriptionAr: true,
        createdAt: true,
        updatedAt: true,

        _count: {
          select: {
            tests: true,
          },
        },
      },
    });

    return {
      success: true as const,
      data: categories,
    };
  } catch (error) {
    console.error("GET_CATEGORIES_ERROR:", error);

    return {
      success: false as const,
      data: [],
      message: "Failed to fetch categories",
    };
  }
}

export async function getCategoryById(categoryId: string) {
  if (!categoryId) {
    return {
      success: false as const,
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
        nameAr: true,
        description: true,
        descriptionAr: true,
      },
    });

    if (!category) {
      return {
        success: false as const,
        data: null,
        message: "Category not found",
      };
    }

    return {
      success: true as const,
      data: category,
    };
  } catch (error) {
    console.error("GET_CATEGORY_ERROR:", error);

    return {
      success: false as const,
      data: null,
      message: "Failed to fetch category",
    };
  }
}

export type CategoryWithCount = {
  id: string;
  name: string;
  nameAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  createdAt: Date;
  updatedAt: Date;

  _count: {
    tests: number;
  };
};
