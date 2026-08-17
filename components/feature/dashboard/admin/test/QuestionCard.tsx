"use client";

import { useState } from "react";
import { Copy, GripVertical, Loader2, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  updateQuestionSchema,
  type UpdateQuestionInput,
} from "@/schemas/question.schema";

import { updateQuestion } from "@/app/actions/admin-actions/test-question/update-question";
import { createQuestion } from "@/app/actions/admin-actions/test-question/create-question";
import { createQuestionOption } from "@/app/actions/admin-actions/test-question/create-question-option";
import { deleteQuestion } from "@/app/actions/admin-actions/test-question/delete-question";

import type { TestQuestion } from "./types";
import QuestionOptionRow from "./QuestionOptionRow";

interface Props {
  question: TestQuestion;
  onDelete: () => void;
  onDuplicate: (question: TestQuestion) => void;
}

const QuestionCard = ({ question, onDelete, onDuplicate }: Props) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isAddingOption, setIsAddingOption] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);

  const { control, register, handleSubmit, getValues, setValue, watch } =
    useForm<UpdateQuestionInput>({
      resolver: zodResolver(updateQuestionSchema),

      defaultValues: {
        questionId: question.id,

        question: question.question,

        options: question.options.map((option) => ({
          id: option.id,
          text: option.text,
          points: option.points,
          order: option.order,
        })),
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  // مهم جدًا:
  // watch يجعل الـ component يعمل re-render لما options تتغير
  const watchedOptions = watch("options");

  const saveQuestion = async (data: UpdateQuestionInput) => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      const result = await updateQuestion(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);
    } catch (error) {
      console.error("SAVE_QUESTION_ERROR:", error);
      toast.error("Failed to save question");
    } finally {
      setIsSaving(false);
    }
  };

  const addOption = async () => {
    if (isAddingOption) return;

    try {
      setIsAddingOption(true);

      const result = await createQuestionOption({
        questionId: question.id,
        text: "",
        points: 0,
      });

      if (!result.success || !result.data) {
        toast.error(result.message);
        return;
      }

      append({
        id: result.data.id,
        text: result.data.text,
        points: result.data.points,
        order: result.data.order,
      });

      toast.success("Option added");
    } catch (error) {
      console.error("ADD_OPTION_ERROR:", error);
      toast.error("Failed to add option");
    } finally {
      setIsAddingOption(false);
    }
  };

  const deleteOption = (index: number) => {
    remove(index);

    const remainingOptions = getValues("options");

    remainingOptions.forEach((_, optionIndex) => {
      setValue(`options.${optionIndex}.order`, optionIndex + 1, {
        shouldDirty: true,
      });
    });
  };

  const handleDeleteQuestion = async () => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);

      const result = await deleteQuestion(question.id);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      onDelete();
    } catch (error) {
      console.error("DELETE_QUESTION_ERROR:", error);
      toast.error("Failed to delete question");
    } finally {
      setIsDeleting(false);
    }
  };

  const duplicateQuestion = async () => {
    if (isDuplicating) return;

    try {
      setIsDuplicating(true);

      const values = getValues();

      const result = await createQuestion({
        testId: question.testId,

        question: `${values.question} (Copy)`,

        options: values.options.map((option) => ({
          text: option.text,
          points: option.points,
        })),
      });

      if (!result.success || !result.data) {
        toast.error(result.message);
        return;
      }

      onDuplicate(result.data);

      toast.success("Question duplicated");
    } catch (error) {
      console.error("DUPLICATE_QUESTION_ERROR:", error);
      toast.error("Failed to duplicate question");
    } finally {
      setIsDuplicating(false);
    }
  };

  return (
    <article className="rounded-2xl border bg-background p-4 sm:p-5">
      <form onSubmit={handleSubmit(saveQuestion)}>
        <div className="flex items-start gap-3">
          {/* Drag handle */}
          <div className="hidden pt-2 text-muted-foreground sm:block">
            <GripVertical className="h-5 w-5 cursor-grab" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1 space-y-4">
            {/* Question */}
            <div className="flex items-start gap-3">
              <span className="mt-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium">
                {question.order}
              </span>

              <Input
                {...register("question")}
                placeholder="Question"
                className="rounded-xl p-3"
              />
            </div>

            {/* Options */}
            <div className="space-y-2">
              {fields.map((field, index) => {
                const option = watchedOptions?.[index];

                return (
                  <QuestionOptionRow
                    key={field.id}
                    option={{
                      id: option?.id ?? field.id,
                      text: option?.text ?? "",
                      points: option?.points ?? 0,
                      order: index + 1,
                    }}
                    onChange={(text, points) => {
                      setValue(`options.${index}.text`, text, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });

                      setValue(`options.${index}.points`, points, {
                        shouldDirty: true,
                        shouldValidate: true,
                      });

                      setValue(`options.${index}.order`, index + 1, {
                        shouldDirty: true,
                      });
                    }}
                    onDelete={() => deleteOption(index)}
                  />
                );
              })}
            </div>

            {/* Add option */}
            <button
              type="button"
              onClick={addOption}
              disabled={isAddingOption}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 disabled:opacity-50"
            >
              {isAddingOption ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Plus className="h-4 w-4" />
              )}

              {isAddingOption ? "Adding..." : "Add option"}
            </button>

            {/* Save */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSaving} className="rounded-xl">
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}

                {isSaving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={duplicateQuestion}
              disabled={isDuplicating}
              className="rounded-lg"
            >
              {isDuplicating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={handleDeleteQuestion}
              disabled={isDeleting}
              className="rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
            >
              {isDeleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </form>
    </article>
  );
};

export default QuestionCard;
