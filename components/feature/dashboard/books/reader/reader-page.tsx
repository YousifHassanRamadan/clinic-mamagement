interface Props {
  bookId: string;
  pageNumber: number;
  totalPages: number;
  zoom: number;
  watermark: string;
}

const ReaderPage = ({
  bookId,
  pageNumber,
  totalPages,
  zoom,
  watermark,
}: Props) => {
  const src = `/api/books/${bookId}/pages/${pageNumber}`;

  return (
    <div className="flex min-h-full justify-center px-3 py-6 sm:px-6">
      <div
        className="relative w-full max-w-4xl overflow-hidden rounded-sm bg-white shadow-2xl"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "top center",
          marginBottom: zoom > 1 ? `${(zoom - 1) * 100}%` : undefined,
        }}
      >
        <img
          src={src}
          alt={`Page ${pageNumber} of ${totalPages}`}
          draggable={false}
          className="pointer-events-none block h-auto w-full select-none"
        />

        {/* Watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="rotate-[-30deg] whitespace-nowrap text-2xl font-bold tracking-widest text-black/10 sm:text-4xl">
            {watermark}
          </div>
        </div>

        {/* Page number */}
        <div className="absolute bottom-3 right-3 rounded-md bg-black/50 px-2 py-1 text-xs text-white">
          {pageNumber} / {totalPages}
        </div>
      </div>
    </div>
  );
};

export default ReaderPage;
