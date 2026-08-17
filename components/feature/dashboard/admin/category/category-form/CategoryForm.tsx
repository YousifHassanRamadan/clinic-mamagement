"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { createCategory } from "@/app/actions/admin-actions/handle-category/create-category";

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
import { updateCategory } from "@/app/actions/admin-actions/handle-category/edit-category";

interface Props {
  mode: "create" | "edit";

  onClose: () => void;

  categoryId?: string;

  defaultValues?: {
    name: string;
    description: string;
  };
}

const CategoryForm = ({ mode, onClose, categoryId, defaultValues }: Props) => {
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
      description: defaultValues?.description ?? "",
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
      toast.error("Category ID is required");
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
        <Label htmlFor="name">Name</Label>

        <Input
          id="name"
          placeholder="e.g. Anxiety & Panic"
          {...register("name")}
        />

        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description (optional)</Label>

        <Textarea
          id="description"
          rows={4}
          placeholder="What belongs in this category..."
          {...register("description")}
        />

        {errors.description && (
          <p className="text-sm text-destructive">
            {errors.description.message}
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
          Cancel
        </Button>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting
            ? mode === "create"
              ? "Creating..."
              : "Saving..."
            : mode === "create"
              ? "Create Category"
              : "Save Changes"}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;
