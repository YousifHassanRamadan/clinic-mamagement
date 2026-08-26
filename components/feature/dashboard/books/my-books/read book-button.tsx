"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { BookOpen } from "lucide-react";

import { Button } from "@/components/ui/button";

import { startBookReader } from "@/app/actions/patient-actions/books/start-book-reader";

interface Props {
  bookId: string;
  isArabic: boolean;
  translations: {
    readBook: string;
  };
}

const ReadBookButton = ({ bookId, isArabic, translations }: Props) => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const handleRead = () => {
    startTransition(async () => {
      const result = await startBookReader(bookId);

      if (!result.success) {
        console.error("START BOOK READER ERROR:", result.message);

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
