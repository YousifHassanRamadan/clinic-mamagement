"use server";

import { prisma } from "@/lib/prisma";

export const toggleUserApproval = async (userId: string) => {
  try {
    if (!userId) {
      return {
        success: false,
        message: "User ID is required.",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        approval: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        approval: !user.approval,
      },
      select: {
        id: true,
        approval: true,
      },
    });

    return {
      success: true,
      message: updatedUser.approval
        ? "User approved successfully."
        : "User unapproved successfully.",
      approval: updatedUser.approval,
    };
  } catch (error) {
    console.error("TOGGLE_USER_APPROVAL_ERROR:", error);

    return {
      success: false,
      message: "Failed to update user approval.",
    };
  }
};
