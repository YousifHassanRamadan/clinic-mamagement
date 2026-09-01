"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

interface RegisterForm {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  gender: "MALE" | "FEMALE";
  phone: string;
  password: string;
}

export async function registerUser(data: RegisterForm) {
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phone: data.phone }],
      },
    });

    if (existingUser) {
      if (existingUser.email === data.email) {
        return {
          success: false,
          message: "Email is already registered.",
        };
      }

      if (existingUser.phone === data.phone) {
        return {
          success: false,
          message: "Phone number is already registered.",
        };
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        password: hashedPassword,
        emailVerified: null,
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
            Your account has been created successfully.
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
      await prisma.verificationToken.delete({
        where: {
          token,
        },
      });

      await prisma.user.delete({
        where: {
          id: user.id,
        },
      });

      return {
        success: false,
        message: "Failed to send verification email.",
      };
    }

    return {
      success: true,
      message:
        "Account created successfully. Please check your email to verify your account.",
    };
  } catch (error) {
    console.error("REGISTER_USER_ERROR:", error);

    return {
      success: false,
      message: "Something went wrong while creating the account.",
    };
  }
}
