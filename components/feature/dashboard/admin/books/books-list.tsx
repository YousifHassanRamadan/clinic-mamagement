"use client";

import { BookOpen, FileText, Users, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import DeleteBookButton from "./delete-book-button";

interface Book {
  id: string;
  title: string;
  titleAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  coverImage: string | null;
  fileUrl: string | null;
  price: number;
  isActive: boolean;
  createdAt: Date;

  _count: {
    accesses: number;
  };
}

interface Translations {
  title: string;
  description: string;
  emptyTitle: string;
  emptyDescription: string;
  noDescription: string;
  active: string;
  inactive: string;
  patient: string;
  patients: string;
  pdf: string;
  edit: string;
  currency: string;
}

interface Props {
  books: Book[];
  locale: "en" | "ar";
  translations: Translations;
  onEdit: (book: Book) => void;
}

const BooksList = ({ books, locale, translations, onEdit }: Props) => {
  if (books.length === 0) {
    return (
      <Card>
        <CardContent className="flex min-h-[300px] flex-col items-center justify-center text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <BookOpen className="h-7 w-7 text-primary" />
          </div>

          <h3 className="text-lg font-semibold">{translations.emptyTitle}</h3>

          <p className="mt-1 text-sm text-muted-foreground">
            {translations.emptyDescription}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {books.map((book) => (
        <Card
          key={book.id}
          className="overflow-hidden transition-shadow hover:shadow-md"
        >
          {/* Cover */}
          <div className="relative flex h-48 items-center justify-center overflow-hidden bg-muted">
            {book.coverImage ? (
              <img
                src={book.coverImage}
                alt={locale === "ar" ? book.titleAr || book.title : book.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <BookOpen className="h-16 w-16 text-muted-foreground/40" />
            )}

            <div
              className={`absolute top-3 ${
                locale === "ar" ? "left-3" : "right-3"
              }`}
            >
              <Badge variant={book.isActive ? "default" : "secondary"}>
                {book.isActive ? translations.active : translations.inactive}
              </Badge>
            </div>
          </div>

          <CardContent className="space-y-4 p-5">
            {/* Info */}
            <div className="min-w-0">
              <h3 className="line-clamp-1 text-lg font-semibold">
                {locale === "ar" ? book.titleAr || book.title : book.title}
              </h3>

              <p className="mt-1 line-clamp-2 min-h-10 text-sm text-muted-foreground">
                {locale === "ar"
                  ? book.descriptionAr ||
                    book.description ||
                    translations.noDescription
                  : book.description || translations.noDescription}
              </p>
            </div>

            {/* Price */}
            <div className="text-lg font-semibold" dir="ltr">
              {book.price.toLocaleString(locale === "ar" ? "ar-EG" : "en-EG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}{" "}
              {translations.currency}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4" />

                <span>
                  {book._count.accesses}{" "}
                  {book._count.accesses === 1
                    ? translations.patient
                    : translations.patients}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <FileText className="h-4 w-4" />

                <span>{translations.pdf}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onEdit(book)}
              >
                <Pencil className="mr-2 h-4 w-4" />
                {translations.edit}
              </Button>

              <DeleteBookButton
                bookId={book.id}
                bookTitle={
                  locale === "ar" ? book.titleAr || book.title : book.title
                }
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default BooksList;
