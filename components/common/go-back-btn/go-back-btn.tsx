"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface GoBackButtonProps {
  isArabic: boolean;
}

const GoBackButton = ({ isArabic }: GoBackButtonProps) => {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-muted"
    >
      <ArrowLeft className="h-4 w-4" />
      {isArabic ? "رجوع" : "Go Back"}
    </button>
  );
};

export default GoBackButton;
