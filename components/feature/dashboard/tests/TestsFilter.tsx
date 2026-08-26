// TestsFilter.tsx

import { cn } from "@/lib/utils";

import { TestCategoryItem } from "./PsychologicalTestsClient";

interface Props {
  value: string;
  onChange: (category: string) => void;
  categories: TestCategoryItem[];
  locale: string;
  allLabel: string;
}

const TestsFilter = ({
  value,
  onChange,
  categories,
  locale,
  allLabel,
}: Props) => {
  const isArabic = locale === "ar";

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
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
        {allLabel}
      </button>

      {categories.map((category) => {
        // AR: استخدم اسم التصنيف بالعربية إذا كان متاحًا، وإلا استخدم الإنجليزي
        // EN: Use the Arabic category name when available, otherwise use English
        const categoryName =
          isArabic && category.nameAr ? category.nameAr : category.name;

        return (
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
            {categoryName}
          </button>
        );
      })}
    </div>
  );
};

export default TestsFilter;
