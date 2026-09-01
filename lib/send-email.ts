import { resend } from "@/lib/resend";

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
}

export const sendEmail = async ({ to, subject, html }: SendEmailParams) => {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Resend email error:", error);

      return {
        success: false,
        message: error.message,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Send email error:", error);

    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to send email",
    };
  }
};
