// components/feature/dashboard/books/reader/reader-navigation.tsx

import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  page: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
  locale?: "ar" | "en";
}

const ReaderNavigation = ({
  page,
  totalPages,
  onPrevious,
  onNext,
  locale = "en",
}: Props) => {
  const isArabic = locale === "ar";

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

      <span className="min-w-16 text-center text-xs font-medium">
        {page} / {totalPages}
      </span>

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
