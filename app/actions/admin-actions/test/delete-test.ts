"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { revalidatePath } from "next/cache";

export async function deleteTest(testId: string) {
  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

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

    revalidatePath("/dashboard/admin/tests");
    revalidatePath("/dashboard/admin/test-results");

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
