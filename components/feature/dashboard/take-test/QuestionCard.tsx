"use client";

import { Card } from "@/components/ui/card";

import AnswerOption from "./AnswerOption";
import QuestionNavigation from "./QuestionNavigation";
import { TestQuestion } from "@/app/dashboard/patient/tests/types";

interface Props {
  question: TestQuestion;

  current: number;
  total: number;

  selected: string | null;

  submitting?: boolean;

  translations: {
    previous: string;
    next: string;
    finish: string;
    submitting: string;
  };

  onSelect: (optionId: string) => void;

  onPrevious: () => void;
  onNext: () => void;
  onFinish: () => void;
}

const QuestionCard = ({
  question,
  current,
  total,
  selected,
  submitting = false,
  translations,
  onSelect,
  onPrevious,
  onNext,
  onFinish,
}: Props) => {
  const isFirst = current === 0;
  const isLast = current === total - 1;

  return (
    <Card className="rounded-3xl p-8">
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold leading-relaxed">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option) => (
            <AnswerOption
              key={option.id}
              checked={selected === option.id}
              label={option.text}
              onClick={() => onSelect(option.id)}
            />
          ))}
        </div>

        <QuestionNavigation
          disabled={!selected || submitting}
          isFirst={isFirst}
          isLast={isLast}
          submitting={submitting}
          translations={translations}
          onPrevious={onPrevious}
          onNext={onNext}
          onFinish={onFinish}
        />
      </div>
    </Card>
  );
};

export default QuestionCard;
