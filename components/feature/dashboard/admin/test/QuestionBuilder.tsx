"use client";

import { useEffect, useState } from "react";
import { Eye, Loader2, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import QuestionCard from "./QuestionCard";
import type { TestQuestion } from "./types";

import { getTestQuestions } from "@/app/actions/admin-actions/test-question/get-test-questions";
import { createQuestion } from "@/app/actions/admin-actions/test-question/create-question";
import { useTestModalStore } from "@/store/test-modal.store";

const QuestionBuilder = () => {
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
        toast.error(result.message);
        return;
      }

      setQuestions(result.data.questions);
    } catch (error) {
      console.error("LOAD_QUESTIONS_ERROR:", error);
      toast.error("Failed to load questions");
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
        options: [
          {
            text: "",
            points: 0,
          },
          {
            text: "",
            points: 1,
          },
        ],
      });

      if (!result.success || !result.data) {
        toast.error(result.message);
        return;
      }

      setQuestions((prev) => [...prev, result.data]);

      toast.success(result.message);
    } catch (error) {
      console.error("CREATE_QUESTION_ERROR:", error);
      toast.error("Failed to create question");
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
      {/* Header */}
      <div className="flex flex-col gap-4 border-b p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-serif text-lg font-semibold">Question builder</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Reorder questions, score each option, duplicate or remove.
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

            {isAddingQuestion ? "Adding..." : "Add question"}
          </Button>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4 p-4 sm:p-5">
        {!selectedTestId ? (
          <div className="rounded-xl border border-dashed p-10 text-center">
            <p className="text-sm text-muted-foreground">
              Select a test to manage its questions.
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
              />
            ))}

            {questions.length === 0 && (
              <div className="rounded-xl border border-dashed p-10 text-center">
                <p className="text-sm text-muted-foreground">
                  No questions yet.
                </p>

                <Button
                  type="button"
                  onClick={addQuestion}
                  disabled={isAddingQuestion}
                  className="mt-4 rounded-xl"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add question
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
