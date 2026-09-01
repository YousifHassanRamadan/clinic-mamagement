"use server";

import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function verifyEmail(token: string, email: string) {
  try {
    if (!token || !email) {
      return {
        success: false,
        message: "Invalid verification link.",
      };
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });

    if (!verificationToken) {
      return {
        success: false,
        message: "Invalid or expired verification link.",
      };
    }

    if (verificationToken.identifier !== email) {
      return {
        success: false,
        message: "Invalid verification link.",
      };
    }

    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: {
          token,
        },
      });

      return {
        success: false,
        message: "Verification link has expired.",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User account was not found.",
      };
    }

    if (user.emailVerified) {
      await prisma.verificationToken.delete({
        where: {
          token,
        },
      });

      return {
        success: true,
        alreadyVerified: true,
        verificationLoginToken: null,
        message: "Email is already verified.",
      };
    }

    const verificationLoginToken = crypto.randomBytes(32).toString("hex");

    await prisma.$transaction([
      prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          emailVerified: new Date(),
        },
      }),

      prisma.verificationToken.delete({
        where: {
          token,
        },
      }),

      prisma.verificationToken.create({
        data: {
          identifier: `LOGIN:${user.email}`,
          token: verificationLoginToken,
          expires: new Date(Date.now() + 5 * 60 * 1000),
        },
      }),
    ]);

    return {
      success: true,
      alreadyVerified: false,
      verificationLoginToken,
      message: "Email verified successfully.",
    };
  } catch (error) {
    console.error("VERIFY_EMAIL_ERROR:", error);

    return {
      success: false,
      alreadyVerified: false,
      verificationLoginToken: null,
      message: "Something went wrong while verifying your email.",
    };
  }
}
