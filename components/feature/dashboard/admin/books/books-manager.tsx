"use client";

import { useRef, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import BooksList from "./books-list";
import CreateBookForm from "./create-book-form";

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

interface FormTranslations {
  createTitle: string;
  editTitle: string;
  bookTitle: string;
  bookTitlePlaceholder: string;
  arabicTitle: string;
  arabicTitlePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  arabicDescription: string;
  arabicDescriptionPlaceholder: string;
  price: string;
  pricePlaceholder: string;
  cover: string;
  currentCoverAlt: string;
  keepCurrentCover: string;
  newCoverHint: string;
  pdf: string;
  keepCurrentPdf: string;
  newPdfHint: string;
  cancel: string;
  create: string;
  update: string;
  uploading: string;
  updating: string;
}

interface ListTranslations {
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
  translations: {
    form: FormTranslations;
    list: ListTranslations;
  };
}

const BooksManager = ({ books, locale, translations }: Props) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const formRef = useRef<HTMLDivElement>(null);

  const handleEdit = (book: Book) => {
    setSelectedBook(book);

    setTimeout(() => {
      formRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleCancelEdit = () => {
    setSelectedBook(null);
  };

  return (
    <>
      {/* Form */}
      <div ref={formRef}>
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedBook
                ? translations.form.editTitle
                : translations.form.createTitle}
            </CardTitle>
          </CardHeader>

          <CardContent>
            <CreateBookForm
              locale={locale}
              translations={translations.form}
              mode={selectedBook ? "edit" : "create"}
              book={selectedBook ?? undefined}
              onSuccess={() => {
                setSelectedBook(null);
              }}
              onCancel={handleCancelEdit}
            />
          </CardContent>
        </Card>
      </div>

      {/* Books */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">{translations.list.title}</h2>

          <p className="text-sm text-muted-foreground">
            {translations.list.description}
          </p>
        </div>

        <BooksList
          locale={locale}
          translations={translations.list}
          books={books}
          onEdit={handleEdit}
        />
      </div>
    </>
  );
};

export default BooksManager;
