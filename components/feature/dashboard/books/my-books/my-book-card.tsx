// components/feature/dashboard/books/my-books/my-book-card.tsx

import Image from "next/image";
import Link from "next/link";

import { BookOpen, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import type { MyBook } from "@/app/actions/patient-actions/books/get-my-books";

interface Props {
  book: MyBook;
  locale: string;
  translations: {
    noDescription: string;
    purchased: string;
    readBook: string;
  };
}

const MyBookCard = ({ book, locale, translations }: Props) => {
  const isArabic = locale === "ar";

  // AR: استخدم العنوان العربي إذا كان موجودًا، وإلا استخدم العنوان الإنجليزي
  // EN: Use the Arabic title when available, otherwise use the English title
  const title = isArabic && book.titleAr ? book.titleAr : book.title;

  // AR: استخدم الوصف العربي إذا كان موجودًا، وإلا استخدم الوصف الإنجليزي
  // EN: Use the Arabic description when available, otherwise use the English description
  const description =
    isArabic && book.descriptionAr ? book.descriptionAr : book.description;

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      {/* Cover */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        {book.coverImage ? (
          <Image
            src={book.coverImage}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description || translations.noDescription}
        </p>

        <div className="mt-auto flex items-center gap-2 pt-5 text-xs text-muted-foreground">
          <Calendar className="h-4 w-4" />

          <span>
            {translations.purchased}{" "}
            {book.purchasedAt.toLocaleDateString(isArabic ? "ar-EG" : "en-EG")}
          </span>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full">
          <Link href={`/dashboard/patient/my-books/${book.id}/read`}>
            <BookOpen className={isArabic ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />

            {translations.readBook}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MyBookCard;
