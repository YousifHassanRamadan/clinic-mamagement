import { NextResponse } from "next/server";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

interface RouteProps {
  params: Promise<{
    bookId: string;
    page: string;
  }>;
}

export async function GET(request: Request, { params }: RouteProps) {
  try {
    // ==========================================
    // AUTH
    // ==========================================

    const session = await auth();

    console.log("BOOK API SESSION:", session);

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    // ==========================================
    // PARAMS
    // ==========================================

    const { bookId, page } = await params;

    const pageNumber = Number(page);

    if (!bookId) {
      return new NextResponse("Book ID is required", {
        status: 400,
      });
    }

    if (!Number.isInteger(pageNumber) || pageNumber < 1) {
      return new NextResponse("Invalid page number", {
        status: 400,
      });
    }

    // ==========================================
    // CHECK BOOK ACCESS
    // ==========================================

    const access = await prisma.bookAccess.findUnique({
      where: {
        userId_bookId: {
          userId: session.user.id,
          bookId,
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

    if (!access) {
      return new NextResponse("Access denied", {
        status: 403,
      });
    }

    if (!access.approval) {
      return new NextResponse("Book access is not approved", {
        status: 403,
      });
    }

    if (!access.book || !access.book.isActive) {
      return new NextResponse("Book is not available", {
        status: 404,
      });
    }

    // ==========================================
    // CHECK PAGE NUMBER
    // ==========================================

    if (pageNumber > access.book.pageCount) {
      return new NextResponse("Page does not exist", {
        status: 404,
      });
    }

    // ==========================================
    // BOOK FILE
    // ==========================================

    if (!access.book.cloudinaryPublicId) {
      return new NextResponse("Book file not found", {
        status: 404,
      });
    }

    // ==========================================
    // CLOUDINARY URL
    // ==========================================

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

    console.log("BOOK PAGE URL:", pageUrl);

    // ==========================================
    // FETCH PAGE FROM CLOUDINARY
    // ==========================================

    const response = await fetch(pageUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error("CLOUDINARY_PAGE_FETCH_ERROR:", response.status, errorText);

      return new NextResponse("Failed to load book page", {
        status: 502,
      });
    }

    // ==========================================
    // RETURN IMAGE
    // ==========================================

    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(imageBuffer, {
      status: 200,

      headers: {
        "Content-Type": response.headers.get("content-type") || "image/jpeg",

        "Cache-Control": "private, no-store, max-age=0, must-revalidate",

        "X-Content-Type-Options": "nosniff",

        "Content-Disposition": "inline",
      },
    });
  } catch (error) {
    console.error("BOOK_PAGE_ROUTE_ERROR:", error);

    return new NextResponse("Failed to load book page", {
      status: 500,
    });
  }
}
