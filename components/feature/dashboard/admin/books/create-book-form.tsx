"use client";

import { useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { bookSchema, type BookFormValues } from "@/schemas/book.schema";

import { createBook } from "@/app/actions/admin-actions/books/create-book";
import { updateBook } from "@/app/actions/admin-actions/books/edit-book";

import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Book {
  id: string;
  title: string;
  titleAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  price: number;
  coverImage: string | null;
  fileUrl: string | null;
}

interface Translations {
  createTitle: string;
  editTitle: string;
  bookTitle: string;
  bookTitlePlaceholder: string;
  arabicTitle: string;
  arabicTitlePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  arabicDescription: string;
  arabicDescriptionPlaceholder: string;
  price: string;
  pricePlaceholder: string;
  cover: string;
  currentCoverAlt: string;
  keepCurrentCover: string;
  newCoverHint: string;
  pdf: string;
  keepCurrentPdf: string;
  newPdfHint: string;
  cancel: string;
  create: string;
  update: string;
  uploading: string;
  updating: string;
}

interface Props {
  mode?: "create" | "edit";
  book?: Book;
  locale: "en" | "ar";
  translations: Translations;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CreateBookForm = ({
  mode = "create",
  book,
  locale,
  translations,
  onSuccess,
  onCancel,
}: Props) => {
  const [isPending, startTransition] = useTransition();

  const formRef = useRef<HTMLFormElement>(null);

  const isEdit = mode === "edit";

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BookFormValues>({
    resolver: zodResolver(bookSchema),

    defaultValues: {
      title: book?.title ?? "",
      titleAr: book?.titleAr ?? "",
      description: book?.description ?? "",
      descriptionAr: book?.descriptionAr ?? "",
      price: book?.price ?? 0,
    },
  });

  useEffect(() => {
    if (book) {
      reset({
        title: book.title,
        titleAr: book.titleAr ?? "",
        description: book.description ?? "",
        descriptionAr: book.descriptionAr ?? "",
        price: book.price,
      });
    }
  }, [book, reset]);

  const onSubmit = (values: BookFormValues) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("titleAr", values.titleAr ?? "");

    formData.append("description", values.description ?? "");
    formData.append("descriptionAr", values.descriptionAr ?? "");

    formData.append("price", values.price.toString());

    if (values.file instanceof File) {
      formData.append("file", values.file);
    }

    if (values.coverImage instanceof File) {
      formData.append("coverImage", values.coverImage);
    }

    startTransition(async () => {
      const result =
        isEdit && book
          ? await updateBook(book.id, formData)
          : await createBook(formData);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      reset({
        title: "",
        titleAr: "",
        description: "",
        descriptionAr: "",
        price: 0,
      });

      formRef.current?.reset();

      onSuccess?.();
    });
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* English Title */}
      <div className="space-y-2">
        <Label htmlFor="title">{translations.bookTitle}</Label>

        <Input
          id="title"
          placeholder={translations.bookTitlePlaceholder}
          disabled={isPending}
          {...register("title")}
          dir="ltr"
          className={
            locale === "ar" ? "placeholder:text-right" : "placeholder:text-left"
          }
        />

        {errors.title && (
          <p className="text-sm text-destructive">{errors.title.message}</p>
        )}
      </div>

      {/* Arabic Title */}
      <div className="space-y-2">
        <Label htmlFor="titleAr">{translations.arabicTitle}</Label>

        <Input
          id="titleAr"
          placeholder={translations.arabicTitlePlaceholder}
          disabled={isPending}
          {...register("titleAr")}
          dir="rtl"
        />

        {errors.titleAr && (
          <p className="text-sm text-destructive">{errors.titleAr.message}</p>
        )}
      </div>

      {/* English Description */}
      <div className="space-y-2">
        <Label htmlFor="description">{translations.description}</Label>

        <Textarea
          id="description"
          placeholder={translations.descriptionPlaceholder}
          disabled={isPending}
          rows={5}
          {...register("description")}
          dir="ltr"
          className={
            locale === "ar" ? "placeholder:text-right" : "placeholder:text-left"
          }
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Arabic Description */}
      <div className="space-y-2">
        <Label htmlFor="descriptionAr">{translations.arabicDescription}</Label>

        <Textarea
          id="descriptionAr"
          placeholder={translations.arabicDescriptionPlaceholder}
          disabled={isPending}
          rows={5}
          {...register("descriptionAr")}
          dir="rtl"
        />

        {errors.descriptionAr && (
          <p className="text-sm text-destructive">
            {errors.descriptionAr.message}
          </p>
        )}
      </div>

      {/* Price */}
      <div className="space-y-2">
        <Label htmlFor="price">{translations.price}</Label>

        <Input
          id="price"
          type="number"
          min="0"
          step="0.01"
          placeholder={translations.pricePlaceholder}
          disabled={isPending}
          {...register("price", {
            valueAsNumber: true,
          })}
          dir="ltr"
        />

        {errors.price && (
          <p className="text-sm text-destructive">{errors.price.message}</p>
        )}
      </div>

      {/* Cover */}
      <div className="space-y-2">
        <Label htmlFor="coverImage">{translations.cover}</Label>

        {isEdit && book?.coverImage && (
          <div className="mb-3">
            <img
              src={book.coverImage}
              alt={translations.currentCoverAlt}
              className="h-32 w-24 rounded-lg border object-cover"
            />
          </div>
        )}

        <Input
          id="coverImage"
          type="file"
          accept="image/png,image/jpeg,image/webp"
          disabled={isPending}
          onChange={(event) => {
            const file = event.target.files?.[0];

            setValue("coverImage", file, {
              shouldValidate: true,
            });
          }}
        />

        <p className="text-xs text-muted-foreground">
          {isEdit ? translations.keepCurrentCover : translations.newCoverHint}
        </p>

        {errors.coverImage && (
          <p className="text-sm text-destructive">
            {errors.coverImage.message}
          </p>
        )}
      </div>

      {/* PDF */}
      <div className="space-y-2">
        <Label htmlFor="file">{translations.pdf}</Label>

        <Input
          id="file"
          type="file"
          accept="application/pdf"
          disabled={isPending}
          onChange={(event) => {
            const file = event.target.files?.[0];

            setValue("file", file, {
              shouldValidate: true,
            });
          }}
        />

        <p className="text-xs text-muted-foreground">
          {isEdit ? translations.keepCurrentPdf : translations.newPdfHint}
        </p>

        {errors.file && (
          <p className="text-sm text-destructive">{errors.file.message}</p>
        )}
      </div>

      {/* Cancel */}
      {isEdit && (
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isPending}
          className="w-full"
        >
          {translations.cancel}
        </Button>
      )}

      {/* Submit */}
      <Button type="submit" disabled={isPending} className="w-full">
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />

            {isEdit ? translations.updating : translations.uploading}
          </>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />

            {isEdit ? translations.update : translations.create}
          </>
        )}
      </Button>
    </form>
  );
};

export default CreateBookForm;
