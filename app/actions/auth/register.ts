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
      },
    });

    return {
      success: true,
      userId: user.id,
      message: "Account created successfully.",
    };
  } catch (error) {
    console.error("REGISTER_USER_ERROR:", error);

    return {
      success: false,
      message: "Something went wrong while creating the account.",
    };
  }
}
