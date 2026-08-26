// components/feature/dashboard/books/my-books/my-books.tsx

import { BookOpen } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import type { MyBook } from "@/app/actions/patient-actions/books/get-my-books";

import MyBookCard from "./my-book-card";

interface Props {
  books: MyBook[];
  locale: string;
  translations: {
    emptyTitle: string;
    emptyDescription: string;
    noDescription: string;
    purchased: string;
    readBook: string;
  };
}

const MyBooks = ({ books, locale, translations }: Props) => {
  if (books.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-[350px] flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>

          {/* AR: لا توجد كتب لديك حتى الآن */}
          {/* EN: You don't have any books yet */}
          <h2 className="text-lg font-semibold">{translations.emptyTitle}</h2>

          {/* AR: الكتب التي تشتريها ستظهر هنا */}
          {/* EN: Books you purchase will appear here */}
          <p className="mt-1 max-w-md text-sm text-muted-foreground">
            {translations.emptyDescription}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <MyBookCard
          key={book.id}
          book={book}
          locale={locale}
          translations={{
            noDescription: translations.noDescription,
            purchased: translations.purchased,
            readBook: translations.readBook,
          }}
        />
      ))}
    </div>
  );
};

export default MyBooks;
