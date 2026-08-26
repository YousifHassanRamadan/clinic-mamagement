"use server";

import crypto from "crypto";
import { Resend } from "resend";

import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

const RESET_TOKEN_IDENTIFIER = "password-reset:";
const RESET_TOKEN_EXPIRATION = 15 * 60 * 1000;

export async function forgotPassword(email: string) {
  try {
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      return {
        success: false,
        message: "Please provide a valid email address.",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
      },
    });

    // Prevent email enumeration
    if (!user) {
      return {
        success: true,
        message:
          "If an account exists with this email, a reset link has been sent.",
      };
    }

    const identifier = `${RESET_TOKEN_IDENTIFIER}${normalizedEmail}`;

    await prisma.verificationToken.deleteMany({
      where: {
        identifier,
      },
    });

    const token = crypto.randomBytes(32).toString("hex");

    const expires = new Date(Date.now() + RESET_TOKEN_EXPIRATION);

    await prisma.verificationToken.create({
      data: {
        identifier,
        token,
        expires,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!appUrl || !fromEmail || !resendApiKey) {
      console.error("Password reset email configuration is missing.");

      await prisma.verificationToken.deleteMany({
        where: {
          identifier,
          token,
        },
      });

      return {
        success: false,
        message: "Unable to send reset email. Please try again later.",
      };
    }

    const resetUrl = `${appUrl}/reset-password?token=${encodeURIComponent(
      token,
    )}`;

    const { error } = await resend.emails.send({
      from: `Dr. Yasmin <${fromEmail}>`,
      to: [user.email],
      subject: "Reset your password",
      html: `
        <!DOCTYPE html>
        <html>
          <body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif;">
            <div style="max-width:600px;margin:40px auto;padding:32px;background:#ffffff;border-radius:12px;">
              <h2 style="margin:0 0 16px;">
                Reset your password
              </h2>

              <p style="color:#475569;">
                Hi ${escapeHtml(user.firstName)},
              </p>

              <p style="color:#475569;line-height:1.6;">
                We received a request to reset your password.
                Click the button below to create a new password.
              </p>

              <div style="margin:28px 0;">
                <a
                  href="${resetUrl}"
                  style="
                    display:inline-block;
                    padding:12px 20px;
                    background:#000000;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:600;
                  "
                >
                  Reset Password
                </a>
              </div>

              <p style="color:#64748b;font-size:14px;line-height:1.6;">
                This link will expire in 15 minutes.
              </p>

              <p style="color:#64748b;font-size:14px;line-height:1.6;">
                If you didn't request a password reset, you can safely ignore
                this email.
              </p>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("RESEND_ERROR:", error);

      await prisma.verificationToken.deleteMany({
        where: {
          identifier,
          token,
        },
      });

      return {
        success: false,
        message: "Unable to send reset email. Please try again later.",
      };
    }

    return {
      success: true,
      message:
        "If an account exists with this email, a reset link has been sent.",
    };
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
