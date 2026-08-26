"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;

  disabled?: boolean;
  submitting?: boolean;

  isFirst?: boolean;
  isLast?: boolean;

  translations: {
    previous: string;
    next: string;
    finish: string;
    submitting: string;
  };
}

const QuestionNavigation = ({
  onPrevious,
  onNext,
  onFinish,
  disabled = false,
  submitting = false,
  isFirst = false,
  isLast = false,
  translations,
}: Props) => {
  return (
    <div className="flex items-center justify-between gap-4 pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirst || submitting}
        className="rounded-xl"
      >
        <ArrowLeft className="me-2 h-4 w-4 rtl:rotate-180" />

        {translations.previous}
      </Button>

      <Button
        type="button"
        onClick={isLast ? onFinish : onNext}
        disabled={disabled || submitting}
        className="rounded-xl"
      >
        {submitting
          ? translations.submitting
          : isLast
            ? translations.finish
            : translations.next}

        {!isLast && !submitting && (
          <ArrowRight className="ms-2 h-4 w-4 rtl:rotate-180" />
        )}
      </Button>
    </div>
  );
};

export default QuestionNavigation;
