"use server";

import { prisma } from "@/lib/prisma";

export async function getTestCategories() {
  try {
    const categories = await prisma.testCategory.findMany({
      where: {
        tests: {
          some: {
            isActive: true,
          },
        },
      },
      include: {
        _count: {
          select: {
            tests: {
              where: {
                isActive: true,
              },
            },
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      success: true,
      categories,
    };
  } catch (error) {
    console.error("GET_TEST_CATEGORIES_ERROR:", error);

    return {
      success: false,
      message: "Failed to get test categories",
      categories: [],
    };
  }
}
