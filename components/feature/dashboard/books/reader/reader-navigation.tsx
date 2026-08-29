// components/feature/dashboard/books/reader/reader-navigation.tsx

"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  onPageChange: (page: number) => void;
  locale?: "ar" | "en";
}

const ReaderNavigation = ({
  page,
  totalPages,
  onPrevious,
  onNext,
  onPageChange,
  locale = "en",
}: Props) => {
  const isArabic = locale === "ar";

  const [pageInput, setPageInput] = useState(String(page));

  const goToPage = () => {
    const targetPage = Number(pageInput);

    if (
      !Number.isInteger(targetPage) ||
      targetPage < 1 ||
      targetPage > totalPages
    ) {
      setPageInput(String(page));
      return;
    }

    onPageChange(targetPage);
    setPageInput(String(targetPage));
  };

  const handlePageInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPageInput(event.target.value);
  };

  const handlePageInputKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      goToPage();
      event.currentTarget.blur();
    }

    if (event.key === "Escape") {
      setPageInput(String(page));
      event.currentTarget.blur();
    }
  };

  const handlePageInputBlur = () => {
    goToPage();
  };

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className="fixed bottom-5 right-4 z-50 flex items-center gap-1 rounded-xl border bg-background/95 p-1.5 shadow-lg backdrop-blur sm:right-6"
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        disabled={isArabic ? page >= totalPages : page <= 1}
        onClick={isArabic ? onNext : onPrevious}
        aria-label={isArabic ? "الصفحة التالية" : "Previous page"}
      >
        {isArabic ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="flex items-center gap-1">
        <Input
          type="number"
          min={1}
          max={totalPages}
          value={pageInput}
          onChange={handlePageInputChange}
          onKeyDown={handlePageInputKeyDown}
          onBlur={handlePageInputBlur}
          aria-label={isArabic ? "رقم الصفحة" : "Page number"}
          className="h-9 w-14 rounded-lg border-0 bg-transparent p-1 text-center text-xs font-medium shadow-none focus-visible:ring-1"
        />

        <span className="text-xs font-medium text-muted-foreground">
          / {totalPages}
        </span>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        disabled={isArabic ? page <= 1 : page >= totalPages}
        onClick={isArabic ? onPrevious : onNext}
        aria-label={isArabic ? "الصفحة السابقة" : "Next page"}
      >
        {isArabic ? (
          <ChevronLeft className="h-4 w-4" />
        ) : (
          <ChevronRight className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default ReaderNavigation;
