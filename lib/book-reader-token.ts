// lib/book-reader-token.ts

import { createHmac, timingSafeEqual } from "crypto";

const TOKEN_TTL_SECONDS = 15 * 60;

interface BookReaderTokenPayload {
  userId: string;
  bookId: string;
  sessionId: string;
  exp: number;
}

function getSecret() {
  const secret = process.env.BOOK_READER_SECRET;

  if (!secret) {
    throw new Error("BOOK_READER_SECRET is not configured");
  }

  return secret;
}

function sign(payload: string) {
  return createHmac("sha256", getSecret()).update(payload).digest("base64url");
}

export function createBookReaderToken(userId: string, bookId: string) {
  const payload: BookReaderTokenPayload = {
    userId,
    bookId,
    sessionId: crypto.randomUUID(),
    exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS,
  };

  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    "base64url",
  );

  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyBookReaderToken(token: string) {
  try {
    const [encodedPayload, signature] = token.split(".");

    if (!encodedPayload || !signature) {
      return null;
    }

    const expectedSignature = sign(encodedPayload);

    const actualBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    if (
      actualBuffer.length !== expectedBuffer.length ||
      !timingSafeEqual(actualBuffer, expectedBuffer)
    ) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString("utf8"),
    ) as BookReaderTokenPayload;

    if (!payload.userId || !payload.bookId || !payload.sessionId) {
      return null;
    }

    if (payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export const BOOK_READER_COOKIE = "book_reader_session";
