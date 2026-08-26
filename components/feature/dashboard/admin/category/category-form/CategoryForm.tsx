// category-form/CategoryForm.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createCategory } from "@/app/actions/admin-actions/handle-category/create-category";
import { updateCategory } from "@/app/actions/admin-actions/handle-category/edit-category";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  createCategorySchema,
  categoryUpdateSchema,
  type CreateCategoryInput,
  type CategoryUpdateInput,
} from "@/schemas/category.schema";

interface Props {
  mode: "create" | "edit";

  onClose: () => void;

  categoryId?: string;

  defaultValues?: {
    name: string;
    nameAr?: string;
    description: string;
    descriptionAr?: string;
  };

  translations?: {
    name: string;
    namePlaceholder: string;
    nameAr: string;
    nameArPlaceholder: string;
    description: string;
    descriptionPlaceholder: string;
    descriptionAr: string;
    descriptionArPlaceholder: string;
    cancel: string;
    creating: string;
    saving: string;
    createCategory: string;
    saveChanges: string;
    categoryIdRequired: string;
  };
}

const defaultTranslations = {
  name: "Name",
  namePlaceholder: "e.g. Anxiety & Panic",
  nameAr: "الاسم بالعربي",
  nameArPlaceholder: "مثال: القلق والهلع",
  description: "Description (optional)",
  descriptionPlaceholder: "What belongs in this category...",
  descriptionAr: "الوصف بالعربي (اختياري)",
  descriptionArPlaceholder: "ما الذي يندرج تحت هذه الفئة...",
  cancel: "Cancel",
  creating: "Creating...",
  saving: "Saving...",
  createCategory: "Create Category",
  saveChanges: "Save Changes",
  categoryIdRequired: "Category ID is required",
};

const CategoryForm = ({
  mode,
  onClose,
  categoryId,
  defaultValues,
  translations = defaultTranslations,
}: Props) => {
  const router = useRouter();

  const schema =
    mode === "create" ? createCategorySchema : categoryUpdateSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCategoryInput | CategoryUpdateInput>({
    resolver: zodResolver(schema),

    defaultValues: {
      name: defaultValues?.name ?? "",
      nameAr: defaultValues?.nameAr ?? "",
      description: defaultValues?.description ?? "",
      descriptionAr: defaultValues?.descriptionAr ?? "",
    },
  });

  const onSubmit = async (data: CreateCategoryInput | CategoryUpdateInput) => {
    if (mode === "create") {
      const result = await createCategory(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.refresh();
      onClose();

      return;
    }

    if (!categoryId) {
      toast.error(translations.categoryIdRequired);
      return;
    }

    const result = await updateCategory(categoryId, data);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    router.refresh();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">{translations.name}</Label>

        <Input
          id="name"
          placeholder={translations.namePlaceholder}
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="nameAr">{translations.nameAr}</Label>

        <Input
          id="nameAr"
          dir="rtl"
          placeholder={translations.nameArPlaceholder}
          {...register("nameAr")}
        />

        {errors.nameAr && (
          <p className="text-sm text-destructive">{errors.nameAr.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">{translations.description}</Label>

        <Textarea
          id="description"
          rows={4}
          placeholder={translations.descriptionPlaceholder}
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="descriptionAr">{translations.descriptionAr}</Label>

        <Textarea
          id="descriptionAr"
          dir="rtl"
          rows={4}
          placeholder={translations.descriptionArPlaceholder}
          {...register("descriptionAr")}
        />

        {errors.descriptionAr && (
          <p className="text-sm text-destructive">
            {errors.descriptionAr.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-3">
        <Button
          variant="outline"
          type="button"
          onClick={onClose}
          disabled={isSubmitting}
        >
          {translations.cancel}
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? mode === "create"
              ? translations.creating
              : translations.saving
            : mode === "create"
              ? translations.createCategory
              : translations.saveChanges}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
