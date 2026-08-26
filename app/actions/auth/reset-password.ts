"use server";

import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

const RESET_TOKEN_IDENTIFIER = "password-reset:";

export async function resetPassword(token: string, newPassword: string) {
  try {
    if (!token || !newPassword) {
      return {
        success: false,
        message: "Invalid reset request.",
      };
    }

    if (newPassword.length < 8) {
      return {
        success: false,
        message: "Password must be at least 8 characters.",
      };
    }

    const verificationToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        identifier: {
          startsWith: RESET_TOKEN_IDENTIFIER,
        },
      },
      select: {
        identifier: true,
        token: true,
        expires: true,
      },
    });

    if (!verificationToken) {
      return {
        success: false,
        message: "Invalid or expired reset link.",
      };
    }

    if (verificationToken.expires <= new Date()) {
      await prisma.verificationToken.deleteMany({
        where: {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
        },
      });

      return {
        success: false,
        message: "This reset link has expired. Please request a new one.",
      };
    }

    const email = verificationToken.identifier.slice(
      RESET_TOKEN_IDENTIFIER.length,
    );

    if (!email) {
      return {
        success: false,
        message: "Invalid or expired reset link.",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid or expired reset link.",
      };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      await tx.verificationToken.deleteMany({
        where: {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
        },
      });
    });

    return {
      success: true,
      message: "Password reset successfully.",
    };
  } catch (error) {
    console.error("RESET_PASSWORD_ERROR:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
