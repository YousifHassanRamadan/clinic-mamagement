"use client";

import { cn } from "@/lib/utils";

import { TestCategoryItem } from "./PsychologicalTestsPage";

interface Props {
  value: string;
  onChange: (category: string) => void;
  categories: TestCategoryItem[];
}

const TestsFilter = ({ value, onChange, categories }: Props) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {/* All */}
      <button
        type="button"
        onClick={() => onChange("ALL")}
        className={cn(
          "rounded-full border px-4 py-2 text-sm whitespace-nowrap transition",
          value === "ALL"
            ? "bg-primary text-primary-foreground"
            : "hover:bg-accent",
        )}
      >
        All
      </button>

      {/* Categories */}
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onChange(category.id)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm whitespace-nowrap transition",
            value === category.id
              ? "bg-primary text-primary-foreground"
              : "hover:bg-accent",
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default TestsFilter;
