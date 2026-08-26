import { Loader2 } from "lucide-react";

const ReaderLoading = () => {
  return (
    <div className="flex min-h-[70vh] items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />

        <p className="text-sm text-muted-foreground">Loading book...</p>
      </div>
    </div>
  );
};

export default ReaderLoading;
