import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

import { authConfig } from "./auth.config";

const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,

  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
        verificationToken: {},
      },

      async authorize(credentials) {
        const verificationToken = credentials?.verificationToken as
          | string
          | undefined;

        // Login automatically after email verification
        if (verificationToken) {
          const token = await prisma.verificationToken.findUnique({
            where: {
              token: verificationToken,
            },
          });

          if (
            !token ||
            !token.identifier.startsWith("LOGIN:") ||
            token.expires < new Date()
          ) {
            return null;
          }

          const email = token.identifier.replace("LOGIN:", "");

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

        // Normal login
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        // Do NOT throw here.
        // LoginForm checks email verification separately.
        if (!user.emailVerified) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
          role: user.role,
        };
      },
    }),
  ],
});

export { auth, handlers, signIn, signOut };
