// app/actions/auth/forget-password.ts

"use server";

import crypto from "crypto";
import { Resend } from "resend";

import { prisma } from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

const RESET_TOKEN_IDENTIFIER = "password-reset:";
const RESET_TOKEN_EXPIRATION = 15 * 60 * 1000;

export async function forgotPassword(email: string, locale: string = "en") {
  try {
    const normalizedEmail = email.trim().toLowerCase();
    const safeLocale = locale === "ar" ? "ar" : "en";

    if (!normalizedEmail) {
      return {
        success: false,
        message:
          safeLocale === "ar"
            ? "يرجى إدخال بريد إلكتروني صالح."
            : "Please provide a valid email address.",
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
          safeLocale === "ar"
            ? "إذا كان هناك حساب مرتبط بهذا البريد الإلكتروني، فسيتم إرسال رابط لإعادة تعيين كلمة المرور."
            : "If an account exists with this email, a reset link has been sent.",
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
        message:
          safeLocale === "ar"
            ? "تعذر إرسال بريد إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى لاحقًا."
            : "Unable to send reset email. Please try again later.",
      };
    }

    const cleanAppUrl = appUrl.replace(/\/+$/, "");

    const resetUrl =
      `${cleanAppUrl}/login/reset-password` +
      `?token=${encodeURIComponent(token)}`;

    const isArabic = safeLocale === "ar";

    const subject = isArabic
      ? "إعادة تعيين كلمة المرور"
      : "Reset your password";

    const greeting = isArabic
      ? `مرحبًا ${escapeHtml(user.firstName)},`
      : `Hi ${escapeHtml(user.firstName)},`;

    const description = isArabic
      ? "لقد تلقينا طلبًا لإعادة تعيين كلمة المرور الخاصة بحسابك. اضغط على الزر أدناه لإنشاء كلمة مرور جديدة."
      : "We received a request to reset your password. Click the button below to create a new password.";

    const buttonText = isArabic ? "إعادة تعيين كلمة المرور" : "Reset Password";

    const expirationText = isArabic
      ? "ستنتهي صلاحية هذا الرابط خلال 15 دقيقة."
      : "This link will expire in 15 minutes.";

    const ignoreText = isArabic
      ? "إذا لم تطلب إعادة تعيين كلمة المرور، يمكنك تجاهل هذا البريد الإلكتروني بأمان."
      : "If you didn't request a password reset, you can safely ignore this email.";

    const { error } = await resend.emails.send({
      // RESEND_FROM_EMAIL already contains:
      // Dr Yasmin Madeh <noreply@dryasminmadeh.com>
      from: fromEmail,

      to: [user.email],

      subject,

      html: `
        <!DOCTYPE html>
        <html
          lang="${safeLocale}"
          dir="${isArabic ? "rtl" : "ltr"}"
        >
          <head>
            <meta charset="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>${escapeHtml(subject)}</title>
          </head>

          <body
            style="
              margin:0;
              padding:0;
              background:#f8fafc;
              font-family:Arial,sans-serif;
              direction:${isArabic ? "rtl" : "ltr"};
            "
          >
            <div
              style="
                max-width:600px;
                margin:40px auto;
                padding:32px;
                background:#ffffff;
                border-radius:12px;
                border:1px solid #e2e8f0;
              "
            >
              <h2
                style="
                  margin:0 0 16px;
                  color:#0f172a;
                "
              >
                ${escapeHtml(subject)}
              </h2>

              <p style="color:#475569;">
                ${greeting}
              </p>

              <p
                style="
                  color:#475569;
                  line-height:1.7;
                "
              >
                ${escapeHtml(description)}
              </p>

              <div
                style="
                  margin:28px 0;
                  text-align:center;
                "
              >
                <a
                  href="${resetUrl}"
                  style="
                    display:inline-block;
                    padding:13px 22px;
                    background:#000000;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-weight:600;
                  "
                >
                  ${escapeHtml(buttonText)}
                </a>
              </div>

              <p
                style="
                  color:#64748b;
                  font-size:14px;
                  line-height:1.7;
                "
              >
                ${escapeHtml(expirationText)}
              </p>

              <p
                style="
                  color:#64748b;
                  font-size:14px;
                  line-height:1.7;
                "
              >
                ${escapeHtml(ignoreText)}
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
        message:
          safeLocale === "ar"
            ? "تعذر إرسال بريد إعادة تعيين كلمة المرور. يرجى المحاولة مرة أخرى لاحقًا."
            : "Unable to send reset email. Please try again later.",
      };
    }

    return {
      success: true,
      message:
        safeLocale === "ar"
          ? "إذا كان هناك حساب مرتبط بهذا البريد الإلكتروني، فسيتم إرسال رابط لإعادة تعيين كلمة المرور."
          : "If an account exists with this email, a reset link has been sent.",
    };
  } catch (error) {
    console.error("FORGOT_PASSWORD_ERROR:", error);

    return {
      success: false,
      message:
        locale === "ar"
          ? "حدث خطأ ما. يرجى المحاولة مرة أخرى."
          : "Something went wrong. Please try again.",
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
