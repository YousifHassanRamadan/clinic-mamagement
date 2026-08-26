"use client";

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import ReaderHeader from "./reader-header";
import ReaderToolbar from "./reader-toolbar";
import ReaderPage from "./reader-page";
import ReaderNavigation from "./reader-navigation";

export interface ReaderBook {
  id: string;
  title: string;
  pageCount: number;
  watermark: string;
}

interface Props {
  book: ReaderBook;
}

const BookReader = ({ book }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = book.pageCount;

  // ==========================================
  // INITIAL PAGE
  // ==========================================

  const getInitialPage = () => {
    const pageParam = Number(searchParams.get("page"));

    if (
      Number.isInteger(pageParam) &&
      pageParam >= 1 &&
      pageParam <= totalPages
    ) {
      return pageParam;
    }

    return 1;
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [zoom, setZoom] = useState(1);

  // ==========================================
  // UPDATE PAGE IN URL
  // ==========================================

  const updatePageInUrl = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());

      if (page === 1) {
        params.delete("page");
      } else {
        params.set("page", String(page));
      }

      const query = params.toString();

      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  // ==========================================
  // NEXT PAGE
  // ==========================================

  const goNext = useCallback(() => {
    if (currentPage >= totalPages) {
      return;
    }

    const nextPage = currentPage + 1;

    setCurrentPage(nextPage);
    updatePageInUrl(nextPage);
  }, [currentPage, totalPages, updatePageInUrl]);

  // ==========================================
  // PREVIOUS PAGE
  // ==========================================

  const goPrevious = useCallback(() => {
    if (currentPage <= 1) {
      return;
    }

    const previousPage = currentPage - 1;

    setCurrentPage(previousPage);
    updatePageInUrl(previousPage);
  }, [currentPage, updatePageInUrl]);

  // ==========================================
  // SYNC PAGE WITH URL
  // ==========================================

  useEffect(() => {
    const pageParam = Number(searchParams.get("page"));

    if (
      Number.isInteger(pageParam) &&
      pageParam >= 1 &&
      pageParam <= totalPages
    ) {
      setCurrentPage(pageParam);
      return;
    }

    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [searchParams, totalPages, currentPage]);

  // ==========================================
  // ZOOM
  // ==========================================

  const zoomIn = () => {
    setZoom((value) => Math.min(value + 0.1, 1.8));
  };

  const zoomOut = () => {
    setZoom((value) => Math.max(value - 0.1, 0.7));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        goNext();
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        goPrevious();
      }

      if (event.key === "+" || event.key === "=") {
        zoomIn();
      }

      if (event.key === "-") {
        zoomOut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goNext, goPrevious]);

  // ==========================================
  // DISABLE SOME BROWSER ACTIONS
  // ==========================================

  useEffect(() => {
    const preventContextMenu = (event: MouseEvent) => {
      event.preventDefault();
    };

    const preventCopy = (event: ClipboardEvent) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", preventContextMenu);
    document.addEventListener("copy", preventCopy);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
      document.removeEventListener("copy", preventCopy);
    };
  }, []);

  // ==========================================
  // EMPTY BOOK
  // ==========================================

  if (!totalPages) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          This book has no pages available.
        </p>
      </div>
    );
  }

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <div className="min-h-screen bg-muted/30">
      <ReaderHeader title={book.title} />

      <main className="relative min-h-[calc(100vh-56px)] overflow-auto pb-24">
        <ReaderPage
          bookId={book.id}
          pageNumber={currentPage}
          totalPages={totalPages}
          zoom={zoom}
          watermark={book.watermark}
        />
      </main>

      <ReaderToolbar
        zoom={zoom}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onReset={resetZoom}
      />

      <ReaderNavigation
        page={currentPage}
        totalPages={totalPages}
        onPrevious={goPrevious}
        onNext={goNext}
      />
    </div>
  );
};

export default BookReader;
