import { notFound, redirect } from "next/navigation";

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
    redirect("/dashboard/my-books");
  }

  return (
    <BookReader
      book={{
        id: result.book.id,
        title: result.book.title,
        pageCount: result.book.pageCount,
        watermark: result.reader.name,
      }}
    />
  );
};

export default ReadBookPage;
