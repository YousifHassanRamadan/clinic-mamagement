// TestRow.tsx

import type { PsychologicalTestWithStats } from "@/app/actions/admin-actions/test/get-tests";

import TestStatusBadge from "./TestStatusBadge";
import TestRowActions from "./TestRowActions";

interface Props {
  test: PsychologicalTestWithStats;
  onDelete: (testId: string) => void;

  translations: {
    updated: string;
    uncategorized: string;
    test: string;
    category: string;
    questions: string;
    duration: string;
    status: string;
    completions: string;
    actions: string;
    loading: string;
    empty: string;
  };
}

const getLocale = () => {
  if (typeof document === "undefined") return "en";

  const locale = document.cookie
    .split("; ")
    .find((row) => row.startsWith("locale="))
    ?.split("=")[1];

  return locale === "ar" ? "ar" : "en";
};

const TestRow = ({ test, onDelete, translations }: Props) => {
  const locale = getLocale();

  return (
    <tr
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="border-b last:border-b-0 transition-colors hover:bg-muted/20"
    >
      <td className="px-4 py-4 text-start sm:px-5">
        <div>
          <p className="font-medium text-foreground">
            {locale === "ar" && test.titleAr ? test.titleAr : test.title}
          </p>

          <p className="mt-0.5 text-xs text-muted-foreground">
            {translations.updated}{" "}
            {test.updatedAt.toLocaleDateString(
              locale === "ar" ? "ar-EG" : "en-US",
            )}
          </p>
        </div>
      </td>

      <td className="px-4 py-4 text-start">
        <span className="text-sm text-muted-foreground">
          {test.category
            ? locale === "ar" && test.category.nameAr
              ? test.category.nameAr
              : test.category.name
            : translations.uncategorized}
        </span>
      </td>

      <td className="px-4 py-4 text-start">
        <span className="text-sm">{test._count.questions}</span>
      </td>

      <td className="px-4 py-4 text-start">
        <span className="text-sm">-</span>
      </td>

      <td className="px-4 py-4 text-start">
        <TestStatusBadge status={test.isActive ? "ACTIVE" : "INACTIVE"} />
      </td>

      <td className="px-4 py-4 text-start">
        <span className="text-sm">{test.completedCount}</span>
      </td>

      <TestRowActions testId={test.id} onDelete={onDelete} />
    </tr>
  );
};

export default TestRow;
