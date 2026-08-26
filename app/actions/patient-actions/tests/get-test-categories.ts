// app/actions/patient-actions/tests/get-test-categories.ts

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

      select: {
        id: true,
        name: true,
        nameAr: true,
        description: true,
        descriptionAr: true,

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
      success: true as const,
      categories,
    };
  } catch (error) {
    console.error("GET_TEST_CATEGORIES_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to get test categories",
      categories: [],
    };
  }
}
