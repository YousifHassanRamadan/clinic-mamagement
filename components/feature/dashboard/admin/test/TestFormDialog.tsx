"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CategoryWithCount } from "@/app/actions/admin-actions/handle-category/get-categories";

import { createTestSchema, type CreateTestInput } from "@/schemas/test.schema";

import { createTest } from "@/app/actions/admin-actions/test/create-test";
import { updateTest } from "@/app/actions/admin-actions/test/update-test";

import { getTestById } from "@/app/actions/admin-actions/test/get-test-by-id";

export type TestFormMode = "create" | "edit";

type TestRange = {
  minScore: number | string;
  maxScore: number | string;
  result: string;
};

interface TestFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode?: TestFormMode;

  testId?: string;

  initialData?: Partial<CreateTestInput>;

  categories: CategoryWithCount[];
}

const TestFormDialog = ({
  open,
  onOpenChange,
  mode = "create",
  testId,
  initialData,
  categories,
}: TestFormDialogProps) => {
  const router = useRouter();

  const isEdit = mode === "edit";

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateTestInput>({
    resolver: zodResolver(createTestSchema),

    defaultValues: {
      title: "",
      description: "",
      categoryId: "",
      isActive: true,

      ranges: [
        {
          minScore: 0,
          maxScore: 0,
          result: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ranges",
  });

  useEffect(() => {
    if (!open) return;

    const loadTest = async () => {
      // CREATE
      if (!isEdit) {
        reset({
          title: "",
          description: "",
          categoryId: "",
          isActive: true,
          ranges: [
            {
              minScore: 0,
              maxScore: 0,
              result: "",
            },
          ],
        });

        return;
      }

      // EDIT
      if (!testId) {
        toast.error("Test ID is required");
        return;
      }

      const result = await getTestById(testId);
      if (!result.success) {
        toast.error(result.message);
        return;
      }

      reset({
        title: result.data.title,
        description: result.data.description ?? "",
        categoryId: result.data.categoryId ?? "",
        isActive: result.data.isActive,

        ranges: result.data.resultRanges.map((range) => ({
          minScore: Number(range.minScore),
          maxScore: Number(range.maxScore),
          result: range.result,
        })),
      });
    };

    loadTest();
  }, [open, isEdit, testId, reset]);

  const onSubmit = async (data: CreateTestInput) => {
    if (isEdit) {
      if (!testId) {
        toast.error("Test ID is required");
        return;
      }

      const hasChanges =
        data.title !== (initialData?.title ?? "") ||
        data.description !== (initialData?.description ?? "") ||
        data.categoryId !== (initialData?.categoryId ?? "") ||
        data.isActive !== (initialData?.isActive ?? true) ||
        JSON.stringify(data.ranges) !==
          JSON.stringify(initialData?.ranges ?? []);

      if (!hasChanges) {
        toast.info("No changes were made");
        return;
      }

      const result = await updateTest(testId, data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.refresh();
      onOpenChange(false);

      return;
    }

    const result = await createTest(data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.refresh();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-[calc(100%-2rem)] max-w-md rounded-2xl border-border bg-background p-0 shadow-xl"
      >
        <DialogHeader className="relative space-y-1 border-b px-5 py-4 text-left">
          <DialogTitle className="text-base font-semibold">
            {isEdit ? "Edit test" : "Create test"}
          </DialogTitle>

          <DialogDescription className="text-xs text-muted-foreground">
            {isEdit
              ? "Update the details of this psychological instrument."
              : "Set up the test details before adding questions."}
          </DialogDescription>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-5">
            {/* Title */}
            <div className="space-y-1.5">
              <label htmlFor="test-title" className="text-xs font-medium">
                Title
              </label>

              <Input
                id="test-title"
                placeholder="e.g. GAD-7 Anxiety Screen"
                className="h-10 rounded-xl p-3"
                disabled={isSubmitting}
                {...register("title")}
              />

              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label htmlFor="test-description" className="text-xs font-medium">
                Description
              </label>

              <Textarea
                id="test-description"
                placeholder="What this instrument measures..."
                className="min-h-[85px] resize-none rounded-xl p-3"
                disabled={isSubmitting}
                {...register("description")}
              />

              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Category</label>

              <Controller
                name="categoryId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    disabled={isSubmitting}
                  >
                    <SelectTrigger className="h-10 w-full rounded-xl p-3">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>

                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />

              {errors.categoryId && (
                <p className="text-sm text-destructive">
                  {errors.categoryId.message}
                </p>
              )}
            </div>

            {/* Score Ranges */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">Score ranges</p>

                  <p className="text-xs text-muted-foreground">
                    Define the result for each score range.
                  </p>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="rounded-xl"
                  onClick={() =>
                    append({
                      minScore: 0,
                      maxScore: 0,
                      result: "",
                    })
                  }
                  disabled={isSubmitting}
                >
                  Add range
                </Button>
              </div>

              <div className="space-y-3">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="space-y-3 rounded-xl border p-3"
                  >
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-xs font-medium">Min score</label>

                        <Input
                          type="number"
                          {...register(`ranges.${index}.minScore`, {
                            valueAsNumber: true,
                          })}
                          disabled={isSubmitting}
                          className="rounded-xl p-3"
                        />

                        {errors.ranges?.[index]?.minScore && (
                          <p className="text-xs text-destructive">
                            {errors.ranges[index]?.minScore?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-medium">Max score</label>

                        <Input
                          type="number"
                          {...register(`ranges.${index}.maxScore`, {
                            valueAsNumber: true,
                          })}
                          disabled={isSubmitting}
                          className="rounded-xl p-3"
                        />

                        {errors.ranges?.[index]?.maxScore && (
                          <p className="text-xs text-destructive">
                            {errors.ranges[index]?.maxScore?.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-medium">Result</label>

                      <Input
                        placeholder="e.g. Mild anxiety"
                        {...register(`ranges.${index}.result`)}
                        disabled={isSubmitting}
                        className="rounded-xl p-3"
                      />

                      {errors.ranges?.[index]?.result && (
                        <p className="text-xs text-destructive">
                          {errors.ranges[index]?.result?.message}
                        </p>
                      )}
                    </div>

                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        disabled={isSubmitting}
                        className="text-destructive"
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {errors.ranges?.message && (
                <p className="text-sm text-destructive">
                  {errors.ranges.message}
                </p>
              )}
            </div>

            {/* Active */}
            <div className="flex items-center justify-between rounded-xl border bg-card px-3 py-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Active</p>

                <p className="text-[11px] text-muted-foreground">
                  Available to assign to patients
                </p>
              </div>

              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    disabled={isSubmitting}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 border-t px-5 py-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
              className="rounded-xl"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl"
            >
              {isSubmitting
                ? isEdit
                  ? "Saving..."
                  : "Creating..."
                : isEdit
                  ? "Save changes"
                  : "Create test"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestFormDialog;
