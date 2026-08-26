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

export interface TestFormTranslations {
  createTitle: string;
  editTitle: string;
  createDescription: string;
  editDescription: string;

  title: string;
  titlePlaceholder: string;

  titleAr: string;
  titleArPlaceholder: string;

  description: string;
  descriptionPlaceholder: string;

  descriptionAr: string;
  descriptionArPlaceholder: string;

  category: string;
  selectCategory: string;

  price: string;
  pricePlaceholder: string;
  currency: string;

  scoreRanges: string;
  scoreRangesDescription: string;
  addRange: string;

  minScore: string;
  maxScore: string;

  result: string;
  resultPlaceholder: string;

  resultAr: string;
  resultArPlaceholder: string;

  remove: string;

  active: string;
  activeDescription: string;

  cancel: string;
  creating: string;
  saving: string;
  createTest: string;
  saveChanges: string;

  close: string;
  testIdRequired: string;
  noChanges: string;
}

interface TestFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode?: TestFormMode;
  testId?: string;
  initialData?: Partial<CreateTestInput>;
  categories: CategoryWithCount[];
  translations: TestFormTranslations;
}

const TestFormDialog = ({
  open,
  onOpenChange,
  mode = "create",
  testId,
  initialData,
  categories,
  translations,
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
      titleAr: "",

      description: "",
      descriptionAr: "",

      categoryId: "",
      price: 0,
      isActive: true,

      ranges: [
        {
          minScore: 0,
          maxScore: 0,
          result: "",
          resultAr: "",
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
      if (!isEdit) {
        reset({
          title: "",
          titleAr: "",

          description: "",
          descriptionAr: "",

          categoryId: "",
          price: 0,
          isActive: true,

          ranges: [
            {
              minScore: 0,
              maxScore: 0,
              result: "",
              resultAr: "",
            },
          ],
        });

        return;
      }

      if (!testId) {
        toast.error(translations.testIdRequired);
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

        titleAr: result.data.titleAr ?? "",
        descriptionAr: result.data.descriptionAr ?? "",

        categoryId: result.data.categoryId ?? "",
        price: Number(result.data.price),
        isActive: result.data.isActive,

        ranges: result.data.resultRanges.map((range) => ({
          minScore: Number(range.minScore),
          maxScore: Number(range.maxScore),
          result: range.result,
          resultAr: range.resultAr ?? "",
        })),
      });
    };

    loadTest();
  }, [open, isEdit, testId, reset, translations.testIdRequired]);

  const onSubmit = async (data: CreateTestInput) => {
    if (isEdit) {
      if (!testId) {
        toast.error(translations.testIdRequired);
        return;
      }

      const hasChanges =
        data.title !== (initialData?.title ?? "") ||
        data.titleAr !== (initialData?.titleAr ?? "") ||
        data.description !== (initialData?.description ?? "") ||
        data.descriptionAr !== (initialData?.descriptionAr ?? "") ||
        data.categoryId !== (initialData?.categoryId ?? "") ||
        data.price !== (initialData?.price ?? 0) ||
        data.isActive !== (initialData?.isActive ?? true) ||
        JSON.stringify(data.ranges) !==
          JSON.stringify(initialData?.ranges ?? []);

      if (!hasChanges) {
        toast.info(translations.noChanges);
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
            {isEdit ? translations.editTitle : translations.createTitle}
          </DialogTitle>

          <DialogDescription className="text-xs text-muted-foreground">
            {isEdit
              ? translations.editDescription
              : translations.createDescription}
          </DialogDescription>

          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
            className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">{translations.close}</span>
          </button>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="max-h-[70vh] space-y-4 overflow-y-auto px-5 py-5">
            <div className="space-y-1.5">
              <label htmlFor="test-title" className="text-xs font-medium">
                {translations.title}
              </label>

              <Input
                id="test-title"
                placeholder={translations.titlePlaceholder}
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

            <div className="space-y-1.5">
              <label htmlFor="test-title-ar" className="text-xs font-medium">
                {translations.titleAr}
              </label>

              <Input
                id="test-title-ar"
                dir="rtl"
                placeholder={translations.titleArPlaceholder}
                className="h-10 rounded-xl p-3 text-right"
                disabled={isSubmitting}
                {...register("titleAr")}
              />

              {errors.titleAr && (
                <p className="text-sm text-destructive">
                  {errors.titleAr.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label htmlFor="test-description" className="text-xs font-medium">
                {translations.description}
              </label>

              <Textarea
                id="test-description"
                placeholder={translations.descriptionPlaceholder}
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

            <div className="space-y-1.5">
              <label
                htmlFor="test-description-ar"
                className="text-xs font-medium"
              >
                {translations.descriptionAr}
              </label>

              <Textarea
                id="test-description-ar"
                dir="rtl"
                placeholder={translations.descriptionArPlaceholder}
                className="min-h-[85px] resize-none rounded-xl p-3 text-right"
                disabled={isSubmitting}
                {...register("descriptionAr")}
              />

              {errors.descriptionAr && (
                <p className="text-sm text-destructive">
                  {errors.descriptionAr.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">
                {translations.category}
              </label>

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
                      <SelectValue placeholder={translations.selectCategory} />
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

            <div className="space-y-1.5">
              <label htmlFor="test-price" className="text-xs font-medium">
                {translations.price}
              </label>

              <div className="relative">
                <Input
                  id="test-price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder={translations.pricePlaceholder}
                  className="h-10 rounded-xl p-3 pr-16"
                  disabled={isSubmitting}
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                  {translations.currency}
                </span>
              </div>

              {errors.price && (
                <p className="text-sm text-destructive">
                  {errors.price.message}
                </p>
              )}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {translations.scoreRanges}
                  </p>

                  <p className="text-xs text-muted-foreground">
                    {translations.scoreRangesDescription}
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
                      resultAr: "",
                    })
                  }
                  disabled={isSubmitting}
                >
                  {translations.addRange}
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
                        <label className="text-xs font-medium">
                          {translations.minScore}
                        </label>

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
                        <label className="text-xs font-medium">
                          {translations.maxScore}
                        </label>

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
                      <label className="text-xs font-medium">
                        {translations.result}
                      </label>

                      <Input
                        placeholder={translations.resultPlaceholder}
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

                    <div className="space-y-1">
                      <label className="text-xs font-medium">
                        {translations.resultAr}
                      </label>

                      <Input
                        dir="rtl"
                        placeholder={translations.resultArPlaceholder}
                        {...register(`ranges.${index}.resultAr`)}
                        disabled={isSubmitting}
                        className="rounded-xl p-3 text-right"
                      />

                      {errors.ranges?.[index]?.resultAr && (
                        <p className="text-xs text-destructive">
                          {errors.ranges[index]?.resultAr?.message}
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
                        {translations.remove}
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

            <div className="flex items-center justify-between rounded-xl border bg-card px-3 py-3">
              <div className="space-y-0.5">
                <p className="text-sm font-medium">{translations.active}</p>

                <p className="text-[11px] text-muted-foreground">
                  {translations.activeDescription}
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
              {translations.cancel}
            </Button>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl"
            >
              {isSubmitting
                ? isEdit
                  ? translations.saving
                  : translations.creating
                : isEdit
                  ? translations.saveChanges
                  : translations.createTest}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestFormDialog;
