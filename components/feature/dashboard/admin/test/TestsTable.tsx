// TestsTable.tsx

"use client";

import { useEffect, useState } from "react";

import { getTests } from "@/app/actions/admin-actions/test/get-tests";
import type { PsychologicalTestWithStats } from "@/app/actions/admin-actions/test/get-tests";

import TestRow from "./TestRow";

interface Props {
  search: string;
  status: "all" | "active" | "inactive";
  categoryId: string;

  translations: {
    test: string;
    category: string;
    questions: string;
    duration: string;
    status: string;
    completions: string;
    actions: string;
    updated: string;
    uncategorized: string;
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

const TestsTable = ({ search, status, categoryId, translations }: Props) => {
  const [tests, setTests] = useState<PsychologicalTestWithStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const locale = getLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    let cancelled = false;

    const loadTests = async () => {
      try {
        setIsLoading(true);

        const result = await getTests({
          search,
          status,
          categoryId,
        });

        if (cancelled) return;

        if (!result.success) {
          setTests([]);
          return;
        }

        setTests(result.data);
      } catch (error) {
        console.error("LOAD_TESTS_ERROR:", error);

        if (!cancelled) {
          setTests([]);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    loadTests();

    return () => {
      cancelled = true;
    };
  }, [search, status, categoryId]);

  const handleDelete = (testId: string) => {
    setTests((currentTests) =>
      currentTests.filter((test) => test.id !== testId),
    );
  };

  if (isLoading) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        {translations.loading}
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-muted-foreground">{translations.empty}</p>
      </div>
    );
  }

  return (
    <div
      dir={isArabic ? "rtl" : "ltr"}
      className={`overflow-x-auto ${
        isArabic ? "[direction:rtl]" : "[direction:ltr]"
      }`}
    >
      <table className="w-full min-w-[850px] border-collapse">
        <thead>
          <tr className="border-b bg-muted/20">
            <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground sm:px-5">
              {translations.test}
            </th>

            <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground">
              {translations.category}
            </th>

            <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground">
              {translations.questions}
            </th>

            <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground">
              {translations.duration}
            </th>

            <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground">
              {translations.status}
            </th>

            <th className="px-4 py-3 text-start text-xs font-medium text-muted-foreground">
              {translations.completions}
            </th>

            <th className="px-4 py-3 text-end text-xs font-medium text-muted-foreground">
              {translations.actions}
            </th>
          </tr>
        </thead>

        <tbody>
          {tests.map((test) => (
            <TestRow
              key={test.id}
              test={test}
              onDelete={handleDelete}
              translations={translations}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestsTable;
