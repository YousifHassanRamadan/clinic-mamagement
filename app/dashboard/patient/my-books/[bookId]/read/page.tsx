// app/dashboard/patient/my-books/[bookId]/read/page.tsx

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import BookReader from "@/components/feature/dashboard/books/reader/book-reader";
import { getMyBookReader } from "@/app/actions/patient-actions/books/get-my-book-reader";

interface Props {
  params: Promise<{
    bookId: string;
  }>;
}

const ReadBookPage = async ({ params }: Props) => {
  const { bookId } = await params;

  const result = await getMyBookReader(bookId);

  if (!result.success) {
    redirect("/dashboard/patient/my-books");
  }

  const cookieStore = await cookies();

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
