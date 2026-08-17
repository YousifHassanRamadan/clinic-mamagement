"use server";

import { prisma } from "@/lib/prisma";

export async function deleteTest(testId: string) {
  if (!testId) {
    return {
      success: false,
      message: "Test ID is required",
    };
  }

  try {
    const test = await prisma.psychologicalTest.findUnique({
      where: {
        id: testId,
      },
    });

    if (!test) {
      return {
        success: false,
        message: "Test not found",
      };
    }

    await prisma.psychologicalTest.delete({
      where: {
        id: testId,
      },
    });

    return {
      success: true,
      message: "Test deleted successfully",
    };
  } catch (error) {
    console.error("DELETE_TEST_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete test",
    };
  }
}
