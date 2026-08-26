"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import QuestionCard from "./QuestionCard";
import type { TestQuestion } from "./types";

import { getTestQuestions } from "@/app/actions/admin-actions/test-question/get-test-questions";
import { createQuestion } from "@/app/actions/admin-actions/test-question/create-question";
import { useTestModalStore } from "@/store/test-modal.store";

interface Props {
  translations: {
    questions: {
      title: string;
      description: string;
      addQuestion: string;
      adding: string;
      selectTest: string;
      loading: string;
      empty: string;
      failedToLoad: string;
      failedToCreate: string;
    };

    question: {
      english: string;
      arabic: string;
      englishPlaceholder: string;
      arabicPlaceholder: string;
      addOption: string;
      adding: string;
      saveChanges: string;
      saving: string;
      duplicate: string;
      duplicating: string;
      delete: string;
      deleting: string;
      optionAdded: string;
      optionFailed: string;
      questionDuplicated: string;
      duplicateFailed: string;
      questionDeleted: string;
      deleteFailed: string;
      saveFailed: string;
    };
  };
}

const QuestionBuilder = ({ translations }: Props) => {
  const selectedTestId = useTestModalStore((state) => state.selectedTestId);

  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);

  const loadQuestions = async () => {
    if (!selectedTestId) {
      setQuestions([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      const result = await getTestQuestions(selectedTestId);

      if (!result.success || !result.data) {
        toast.error(result.message ?? translations.questions.failedToLoad);
        return;
      }

      setQuestions(
        result.data.questions.map((question) => ({
          ...question,
          questionAr: question.questionAr ?? "",
          options: question.options.map((option) => ({
            ...option,
            textAr: option.textAr ?? "",
          })),
        })),
      );
    } catch (error) {
      console.error("LOAD_QUESTIONS_ERROR:", error);
      toast.error(translations.questions.failedToLoad);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, [selectedTestId]);

  const addQuestion = async () => {
    if (isAddingQuestion || !selectedTestId) return;

    try {
      setIsAddingQuestion(true);

      const result = await createQuestion({
        testId: selectedTestId,
        question: "New question",
        questionAr: "سؤال جديد",
        options: [
          {
            text: "Option 1",
            textAr: "الخيار الأول",
            points: 0,
          },
          {
            text: "Option 2",
            textAr: "الخيار الثاني",
            points: 1,
          },
        ],
      });

      if (!result.success || !result.data) {
        toast.error(result.message ?? translations.questions.failedToCreate);
        return;
      }

      setQuestions((prev) => [...prev, result.data]);

      toast.success(result.message);
    } catch (error) {
      console.error("CREATE_QUESTION_ERROR:", error);
      toast.error(translations.questions.failedToCreate);
    } finally {
      setIsAddingQuestion(false);
    }
  };

  const deleteQuestion = (questionId: string) => {
    setQuestions((prev) =>
      prev
        .filter((question) => question.id !== questionId)
        .map((question, index) => ({
          ...question,
          order: index + 1,
        })),
    );
  };

  const addDuplicatedQuestion = (question: TestQuestion) => {
    setQuestions((prev) =>
      [...prev, question].sort((a, b) => a.order - b.order),
    );
  };

  return (
    <section className="rounded-2xl border bg-card shadow-sm">
      <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-lg font-semibold">
            {translations.questions.title}
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {translations.questions.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={addQuestion}
            disabled={isAddingQuestion || !selectedTestId}
            className="rounded-xl"
          >
            {isAddingQuestion ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}

            {isAddingQuestion
              ? translations.questions.adding
              : translations.questions.addQuestion}
          </Button>
        </div>
      </div>

      <div className="space-y-4 p-4 sm:p-5">
        {!selectedTestId ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <p className="text-sm text-muted-foreground">
              {translations.questions.selectTest}
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-10">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            {questions.map((question) => (
              <QuestionCard
                key={question.id}
                question={question}
                onDelete={() => deleteQuestion(question.id)}
                onDuplicate={addDuplicatedQuestion}
                translations={translations.question}
              />
            ))}

            {questions.length === 0 && (
              <div className="rounded-xl border border-dashed p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  {translations.questions.empty}
                </p>

                <Button
                  type="button"
                  onClick={addQuestion}
                  disabled={isAddingQuestion}
                  className="mt-4 rounded-xl"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {translations.questions.addQuestion}
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default QuestionBuilder;
