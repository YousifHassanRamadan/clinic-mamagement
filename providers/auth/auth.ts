// auth.ts

import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { authConfig } from "./auth.config";

const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
        },
        password: {
          type: "password",
        },
        verificationToken: {
          type: "text",
        },
      },

      async authorize(credentials) {
        try {
          const verificationToken =
            typeof credentials?.verificationToken === "string"
              ? credentials.verificationToken
              : undefined;

          if (verificationToken) {
            const token = await prisma.verificationToken.findUnique({
              where: {
                token: verificationToken,
              },
            });

            if (
              !token ||
              !token.identifier.startsWith("LOGIN:") ||
              token.expires <= new Date()
            ) {
              return null;
            }

            const email = token.identifier
              .replace(/^LOGIN:/, "")
              .trim()
              .toLowerCase();

            if (!email) {
              return null;
            }

            const user = await prisma.user.findUnique({
              where: {
                email,
              },
              select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                role: true,
                emailVerified: true,
              },
            });

            if (!user || !user.emailVerified) {
              return null;
            }

            await prisma.verificationToken.delete({
              where: {
                token: verificationToken,
              },
            });

            return {
              id: user.id,
              email: user.email,
              name: `${user.firstName} ${user.lastName}`,
              role: user.role,
            };
          }

          if (
            typeof credentials?.email !== "string" ||
            typeof credentials?.password !== "string"
          ) {
            return null;
          }

          const email = credentials.email.trim().toLowerCase();
          const password = credentials.password;

          if (!email || !password) {
            return null;
          }

          const user = await prisma.user.findUnique({
            where: {
              email,
            },
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
              role: true,
              password: true,
              emailVerified: true,
            },
          });

          if (!user) {
            return null;
          }

          if (!user.password) {
            return null;
          }

          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            return null;
          }

          if (!user.emailVerified) {
            return null;
          }

          return {
            id: user.id,
            email: user.email,
            name: `${user.firstName} ${user.lastName}`,
            role: user.role,
          };
        } catch (error) {
          console.error("AUTHORIZE_ERROR:", error);
          return null;
        }
      },
    }),
  ],
});

export { auth, handlers, signIn, signOut };
