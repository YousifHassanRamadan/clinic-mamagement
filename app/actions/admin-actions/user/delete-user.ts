"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export const deleteUser = async (userId: string) => {
  try {
    if (!userId) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    // Prevent deleting yourself
    if (session.user.id === userId) {
      return {
        success: false,
        message: "You cannot delete your own account.",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return {
      success: true,
      message: "User deleted successfully.",
    };
  } catch (error) {
    console.error("DELETE_USER_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete user.",
    };
  }
};
