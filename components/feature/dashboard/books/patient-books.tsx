// components/feature/dashboard/books/patient-books.tsx

import { BookOpen } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { PatientBook } from "@/app/actions/patient-actions/books/get-books";

import PatientBookCard from "./patient-book-card";

interface Props {
  books: PatientBook[];
  locale: string;
}

const PatientBooks = ({ books, locale }: Props) => {
  const isArabic = locale === "ar";

  if (books.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-[320px] flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>

          <h3 className="text-lg font-semibold">
            {isArabic ? "لا توجد كتب متاحة" : "No books available"}
          </h3>

          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {isArabic
              ? "لا توجد كتب متاحة في الوقت الحالي. يرجى التحقق مرة أخرى لاحقًا."
              : "There are no books available at the moment. Please check again later."}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <PatientBookCard key={book.id} book={book} locale={locale} />
      ))}
    </div>
  );
};

export default PatientBooks;
