// app/api/books/pages/[page]/route.ts

import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import {
  BOOK_READER_COOKIE,
  verifyBookReaderToken,
} from "@/lib/book-reader-token";

interface RouteProps {
  params: Promise<{
    page: string;
  }>;
}

const RATE_LIMIT_WINDOW = 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 30;

const requests = new Map<
  string,
  {
    count: number;
    resetAt: number;
  }
>();

function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  return (
    forwardedFor?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(key: string) {
  const now = Date.now();
  const current = requests.get(key);

  if (!current || now >= current.resetAt) {
    requests.set(key, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW,
    });

    return {
      allowed: true,
      retryAfter: 0,
    };
  }

  if (current.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.ceil((current.resetAt - now) / 1000),
    };
  }

  current.count += 1;

  return {
    allowed: true,
    retryAfter: 0,
  };
}

export async function GET(request: Request, { params }: RouteProps) {
  try {
    const cookieStore = await cookies();

    const token = cookieStore.get(BOOK_READER_COOKIE)?.value;

    if (!token) {
      return new NextResponse("Reader session expired", {
        status: 401,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }

    const tokenData = verifyBookReaderToken(token);

    if (!tokenData) {
      return new NextResponse("Invalid reader session", {
        status: 401,
        headers: {
          "Cache-Control": "no-store",
        },
      });
    }

    const clientIp = getClientIp(request);

    const rateLimitKey = [tokenData.userId, tokenData.bookId, clientIp].join(
      ":",
    );

    const rateLimit = checkRateLimit(rateLimitKey);

    if (!rateLimit.allowed) {
      return new NextResponse("Too many requests", {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfter),
          "Cache-Control": "no-store",
        },
      });
    }

    const { page } = await params;

    const pageNumber = Number(page);

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
      return new NextResponse("Invalid page number", {
        status: 400,
      });
    }

    const access = await prisma.bookAccess.findUnique({
      where: {
        userId_bookId: {
          userId: tokenData.userId,
          bookId: tokenData.bookId,
        },
      },

      select: {
        approval: true,

        book: {
          select: {
            id: true,
            isActive: true,
            pageCount: true,
            cloudinaryPublicId: true,
          },
        },
      },
    });

    if (!access?.approval) {
      return new NextResponse("Access denied", {
        status: 403,
      });
    }

    if (!access.book?.isActive) {
      return new NextResponse("Book is not available", {
        status: 404,
      });
    }

    if (pageNumber > access.book.pageCount) {
      return new NextResponse("Page does not exist", {
        status: 404,
      });
    }

    if (!access.book.cloudinaryPublicId) {
      return new NextResponse("Book file not found", {
        status: 404,
      });
    }

    const pageUrl = cloudinary.url(access.book.cloudinaryPublicId, {
      secure: true,
      resource_type: "image",
      type: "upload",
      format: "jpg",

      transformation: [
        {
          page: pageNumber,
          width: 1400,
          crop: "limit",
        },
      ],
    });

    const response = await fetch(pageUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      return new NextResponse("Failed to load book page", {
        status: 502,
      });
    }

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,

      headers: {
        "Content-Type": response.headers.get("content-type") || "image/jpeg",

        "Cache-Control": "private, no-store, max-age=0, must-revalidate",

        "X-Content-Type-Options": "nosniff",

        "Content-Disposition": "inline",

        "X-Frame-Options": "SAMEORIGIN",

        "Referrer-Policy": "same-origin",
      },
    });
  } catch (error) {
    console.error("BOOK_PAGE_ROUTE_ERROR:", error);

    return new NextResponse("Failed to load book page", {
      status: 500,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
