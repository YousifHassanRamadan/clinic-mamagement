// components/feature/dashboard/books/reader/reader-toolbar.tsx

import { Minus, Plus, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
}

const ReaderToolbar = ({ zoom, onZoomIn, onZoomOut, onReset }: Props) => {
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-1 rounded-xl border bg-background/95 p-1.5 shadow-lg backdrop-blur">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={onZoomOut}
        disabled={zoom <= 0.7}
        aria-label="Zoom out"
      >
        <Minus className="h-4 w-4" />
      </Button>

      <button
        type="button"
        onClick={onReset}
        className="min-w-16 rounded-lg px-2 py-2 text-xs font-medium hover:bg-muted"
      >
        {Math.round(zoom * 100)}%
      </button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={onZoomIn}
        disabled={zoom >= 1.8}
        aria-label="Zoom in"
      >
        <Plus className="h-4 w-4" />
      </Button>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-9 w-9"
        onClick={onReset}
        aria-label="Reset zoom"
      >
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ReaderToolbar;
