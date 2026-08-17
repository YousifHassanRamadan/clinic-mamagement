"use client";

import { FolderOpen } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCategoryModalStore } from "@/store/category-modal.store";

const EmptyCategories = () => {
  const openCreate = useCategoryModalStore((state) => state.openCreate);
  return (
    <Card className="flex flex-col items-center rounded-2xl border-dashed py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <FolderOpen className="h-8 w-8 text-primary" />
      </div>

      <h2 className="mt-6 text-2xl font-semibold">No Categories Yet</h2>

      <p className="mt-2 max-w-md text-muted-foreground">
        Create your first psychological test category to organize your
        assessments.
      </p>

      <Button className="mt-8 rounded-xl" onClick={openCreate}>
        Create Category
      </Button>
    </Card>
  );
};

export default EmptyCategories;
