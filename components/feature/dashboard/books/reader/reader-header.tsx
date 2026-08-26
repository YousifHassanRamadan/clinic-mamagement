// reader-header.tsx

import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

interface Props {
  title: string;
}

const ReaderHeader = ({ title }: Props) => {
  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80"
    >
      <div className="flex h-14 items-center gap-3 px-4 sm:px-6">
        <Link
          href="/dashboard/patient/my-books"
          className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-muted"
          aria-label="Back to my books"
        >
          <ArrowLeft className="h-4 w-4" />
        </Link>

        <div className="flex min-w-0 items-center gap-2">
          <BookOpen className="hidden h-5 w-5 shrink-0 text-primary sm:block" />

          <h1
            dir="auto"
            className="truncate text-sm font-semibold sm:text-base"
          >
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default ReaderHeader;
