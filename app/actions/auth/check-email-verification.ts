"use server";

import { prisma } from "@/lib/prisma";
import { resendVerificationEmail } from "./resend-verification-email";

export async function checkEmailVerification(email: string) {
  try {
    if (!email) {
      return {
        success: false,
        verified: false,
        message: "Please enter your email address.",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        emailVerified: true,
      },
    });

    if (!user) {
      return {
        success: false,
        verified: false,
        message: "Invalid email or password.",
      };
    }

    if (user.emailVerified) {
      return {
        success: true,
        verified: true,
        message: "Email is verified.",
      };
    }

    const resendResult = await resendVerificationEmail(email);

    if (!resendResult.success) {
      return {
        success: false,
        verified: false,
        message: resendResult.message,
      };
    }

    return {
      success: true,
      verified: false,
      message:
        "Your email is not verified. A new verification email has been sent.",
    };
  } catch (error) {
    console.error("CHECK_EMAIL_VERIFICATION_ERROR:", error);

    return {
      success: false,
      verified: false,
      message: "Something went wrong while checking your email.",
    };
  }
}
