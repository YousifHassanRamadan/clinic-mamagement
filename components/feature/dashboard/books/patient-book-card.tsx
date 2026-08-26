// components/feature/dashboard/books/patient-book-card.tsx

"use client";

import Image from "next/image";
import { BookOpen, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import type { PatientBook } from "@/app/actions/patient-actions/books/get-books";

interface Props {
  book: PatientBook;
  locale: string;
}

const PatientBookCard = ({ book, locale }: Props) => {
  const isArabic = locale === "ar";

  // AR: استخدم العنوان العربي إذا كان موجودًا، وإلا استخدم العنوان الإنجليزي
  // EN: Use the Arabic title when available, otherwise use the English title
  const title = isArabic && book.titleAr?.trim() ? book.titleAr : book.title;

  // AR: استخدم الوصف العربي إذا كان موجودًا، وإلا استخدم الوصف الإنجليزي
  // EN: Use the Arabic description when available, otherwise use the English description
  const description =
    isArabic && book.descriptionAr?.trim()
      ? book.descriptionAr
      : book.description;

  const handleBuyNow = () => {
    const phone = "201014217564";

    const message = encodeURIComponent(
      isArabic
        ? `مرحبًا، أريد شراء الكتاب: ${title}`
        : `Hello, I want to buy the book: ${title}`,
    );

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
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
          <div className="flex h-full w-full items-center justify-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/30" />
          </div>
        )}
      </div>

      <CardContent className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 text-lg font-semibold">{title}</h3>

        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {description ||
            (isArabic ? "لا يوجد وصف متاح." : "No description available.")}
        </p>

        <div className="mt-auto pt-5">
          <p className="text-xl font-bold">
            {book.price.toLocaleString(isArabic ? "ar-EG" : "en-EG")}{" "}
            {isArabic ? "جنيه مصري" : "EGP"}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button type="button" onClick={handleBuyNow} className="w-full">
          <ShoppingCart
            className={isArabic ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"}
          />

          {isArabic ? "شراء الكتاب" : "Buy Book"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PatientBookCard;
