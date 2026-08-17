"use client";

import { Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const CategoryActions = () => {
  return (
    <div className="flex gap-3">
      <Button variant="outline" size="sm" className="rounded-xl">
        <Pencil className="mr-2 h-4 w-4" />
        Edit
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="rounded-xl text-destructive hover:text-destructive"
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
};

export default CategoryActions;
