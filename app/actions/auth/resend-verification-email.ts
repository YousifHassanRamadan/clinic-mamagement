"use server";

import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function resendVerificationEmail(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        firstName: true,
        email: true,
        emailVerified: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "Invalid email or password.",
      };
    }

    if (user.emailVerified) {
      return {
        success: false,
        message: "Email is already verified.",
      };
    }

    await prisma.verificationToken.deleteMany({
      where: {
        identifier: user.email,
      },
    });

    const token = crypto.randomBytes(32).toString("hex");

    await prisma.verificationToken.create({
      data: {
        identifier: user.email,
        token,
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    });

    const verifyUrl = `${
      process.env.NEXTAUTH_URL
    }/verify-email?token=${token}&email=${encodeURIComponent(user.email)}`;

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: user.email,
      subject: "Verify your account",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:40px;">
          <h2>Verify your account</h2>

          <p>Hello ${user.firstName},</p>

          <p>
            Please click the button below to verify your email address.
          </p>

          <div style="margin:30px 0;">
            <a
              href="${verifyUrl}"
              style="
                display:inline-block;
                padding:14px 24px;
                background:#111827;
                color:white;
                text-decoration:none;
                border-radius:10px;
                font-weight:600;
              "
            >
              Verify Account
            </a>
          </div>

          <p>
            This verification link will expire in 24 hours.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("RESEND_VERIFICATION_ERROR:", error);

      return {
        success: false,
        message: "Failed to send verification email.",
      };
    }

    return {
      success: true,
      message: "Verification email sent successfully.",
    };
  } catch (error) {
    console.error("RESEND_VERIFICATION_ERROR:", error);

    return {
      success: false,
      message: "Something went wrong while sending the email.",
    };
  }
}
