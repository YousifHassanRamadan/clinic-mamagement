import NextAuth from "next-auth";
import { NextResponse } from "next/server";

import { authConfig } from "@/providers/auth/auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const user = req.auth?.user;

  // Not authenticated → protected dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const role = user.role;

    // Doctor routes → DOCTOR only
    if (pathname.startsWith("/dashboard/admin")) {
      if (role !== "DOCTOR") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    // Patient routes → PATIENT only
    if (pathname.startsWith("/dashboard/patient")) {
      if (role !== "PATIENT") {
        return NextResponse.redirect(new URL("/unauthorized", req.url));
      }
    }

    return NextResponse.next();
  }

  // Already logged in → don't allow home/login pages
  if (user && (pathname === "/" || pathname === "/login")) {
    if (user.role === "DOCTOR") {
      return NextResponse.redirect(
        new URL("/dashboard/admin/overview", req.url),
      );
    }

    if (user.role === "PATIENT") {
      return NextResponse.redirect(new URL("/dashboard/", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/", "/login", "/dashboard/:path*"],
};
