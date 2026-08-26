// Book Card - Read Book Button

"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

import { getMyBookReader } from "@/app/actions/patient-actions/books/get-my-book-reader";

const ReadBookButton = ({
  bookId,
  isArabic,
  translations,
}: {
  bookId: string;
  isArabic: boolean;
  translations: {
    readBook: string;
  };
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleRead = () => {
    startTransition(async () => {
      const result = await getMyBookReader(bookId);

      if (!result.success) {
        return;
      }

      router.push("/dashboard/patient/my-books/read");
    });
  };

  return (
    <Button
      type="button"
      className="w-full"
      disabled={isPending}
      onClick={handleRead}
    >
      <BookOpen className={isArabic ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />

      {translations.readBook}
    </Button>
  );
};

export default ReadBookButton;
