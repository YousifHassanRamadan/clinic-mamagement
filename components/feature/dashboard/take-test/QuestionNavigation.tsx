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
}

const QuestionNavigation = ({
  onPrevious,
  onNext,
  onFinish,

  disabled = false,
  submitting = false,

  isFirst = false,
  isLast = false,
}: Props) => {
  return (
    <div className="flex items-center justify-between pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={onPrevious}
        disabled={isFirst || submitting}
        className="rounded-xl"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Previous
      </Button>

      <Button
        type="button"
        onClick={isLast ? onFinish : onNext}
        disabled={disabled || submitting}
        className="rounded-xl"
      >
        {submitting ? "Submitting..." : isLast ? "Finish Test" : "Next"}

        {!isLast && !submitting && <ArrowRight className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};

export default QuestionNavigation;
