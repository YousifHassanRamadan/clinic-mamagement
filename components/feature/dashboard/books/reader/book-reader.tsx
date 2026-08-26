"use client";

import { useCallback, useEffect, useState } from "react";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1);

  const totalPages = book.pageCount;

  const goNext = useCallback(() => {
    setCurrentPage((current) => Math.min(current + 1, totalPages));
  }, [totalPages]);

  const goPrevious = useCallback(() => {
    setCurrentPage((current) => Math.max(current - 1, 1));
  }, []);

  const zoomIn = () => {
    setZoom((value) => Math.min(value + 0.1, 1.8));
  };

  const zoomOut = () => {
    setZoom((value) => Math.max(value - 0.1, 0.7));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  // Keyboard navigation
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

  // Disable some browser actions
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

  if (!totalPages) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">
          This book has no pages available.
        </p>
      </div>
    );
  }

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
