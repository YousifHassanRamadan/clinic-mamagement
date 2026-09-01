// components/feature/dashboard/patient/tests/TestResultsPage.tsx

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import LatestResultCard from "./LatestResultCard";
import ResultCard from "./ResultCard";
import { TestResult } from "./types";

import { getTestResults } from "@/app/actions/patient-actions/tests/get-test-results";

const TestResultsPage = () => {
  const [results, setResults] = useState<TestResult[]>([]);
  const [loading, setLoading] = useState(true);

  const [locale, setLocale] = useState<"en" | "ar">("en");

  useEffect(() => {
    const cookieLocale = document.cookie
      .split("; ")
      .find((row) => row.startsWith("locale="))
      ?.split("=")[1];

    const currentLocale = cookieLocale === "ar" ? "ar" : "en";

    setLocale(currentLocale);

    const loadResults = async () => {
      try {
        const response = await getTestResults();

        if (!response.success) {
          toast.error(response.message);
          return;
        }

        setResults(response.data);
      } catch (error) {
        console.error("LOAD_TEST_RESULTS_ERROR:", error);

        toast.error(
          currentLocale === "ar"
            ? "فشل تحميل نتائج الاختبارات"
            : "Failed to load test results",
        );
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, []);

  const isArabic = locale === "ar";

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-9 w-48 animate-pulse rounded-lg bg-muted" />
          <div className="mt-3 h-5 w-80 animate-pulse rounded-lg bg-muted" />
        </div>

        <div className="h-64 animate-pulse rounded-3xl bg-muted" />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="h-52 animate-pulse rounded-3xl bg-muted" />
          <div className="h-52 animate-pulse rounded-3xl bg-muted" />
        </div>
      </div>
    );
  }

  const latest = results[0];
  const previous = results.slice(1);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {isArabic ? "نتائج الاختبارات" : "Test Results"}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {isArabic
              ? "جميع التقييمات المكتملة، من الأحدث إلى الأقدم."
              : "Every completed assessment, newest first."}
          </p>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="rounded-3xl border p-8 text-center">
          <p className="text-muted-foreground">
            {isArabic
              ? "ليس لديك أي اختبارات مكتملة حتى الآن."
              : "You don't have any completed tests yet."}
          </p>
        </div>
      ) : (
        <>
          <LatestResultCard result={latest} locale={locale} />

          {previous.length > 0 && (
            <div className="grid gap-6 lg:grid-cols-2">
              {previous.map((result) => (
                <ResultCard key={result.id} result={result} locale={locale} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TestResultsPage;
