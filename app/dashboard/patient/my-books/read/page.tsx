// app/dashboard/patient/my-books/read/page.tsx

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import BookReader from "@/components/feature/dashboard/books/reader/book-reader";
import { getMyBookReader } from "@/app/actions/patient-actions/books/get-my-book-reader";

const ReadBookPage = async () => {
  const cookieStore = await cookies();

  const readerToken = cookieStore.get("book_reader_session")?.value;

  if (!readerToken) {
    redirect("/dashboard/patient/my-books");
  }

  const result = await getMyBookReader();

  if (!result.success) {
    redirect("/dashboard/patient/my-books");
  }

  const locale = cookieStore.get("locale")?.value ?? "en";

  const title =
    locale === "ar"
      ? (result.book.titleAr ?? result.book.title)
      : result.book.title;

  return (
    <BookReader
      book={{
        id: result.book.id,
        title,
        pageCount: result.book.pageCount,
        watermark: result.reader.name,
      }}
    />
  );
};

export default ReadBookPage;
