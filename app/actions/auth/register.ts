"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

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
    const email = data.email.trim().toLowerCase();
    const phone = data.phone.trim();

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { phone }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return {
          success: false,
          message: "Email is already registered.",
        };
      }

      if (existingUser.phone === phone) {
        return {
          success: false,
          message: "Phone number is already registered.",
        };
      }
    }

    const hashedPassword = await bcrypt.hash(data.password, 12);

    await prisma.user.create({
      data: {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        address: data.address.trim(),
        email,
        gender: data.gender,
        phone,
        password: hashedPassword,
        emailVerified: null,
      },
    });

    return {
      success: true,
      message: "Account created successfully.",
      email,
      password: data.password,
    };
  } catch (error) {
    console.error("REGISTER_USER_ERROR:", error);

    return {
      success: false,
      message: "Something went wrong while creating the account.",
    };
  }
}
