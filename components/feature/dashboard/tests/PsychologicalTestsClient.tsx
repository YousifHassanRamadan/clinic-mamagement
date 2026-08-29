// PsychologicalTestsClient.tsx

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import TestsFilter from "./TestsFilter";
import TestsGrid from "./TestsGrid";

import { getTestCategories } from "@/app/actions/patient-actions/tests/get-test-categories";
import { getTests } from "@/app/actions/patient-actions/tests/get-tests";

export interface TestCategoryItem {
  id: string;
  name: string;
  nameAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  _count: {
    tests: number;
  };
}

export interface PsychologicalTestItem {
  id: string;
  title: string;
  titleAr: string | null;
  description: string | null;
  descriptionAr: string | null;

  category: {
    id: string;
    name: string;
    nameAr: string | null;
  } | null;

  _count: {
    questions: number;
  };

  isApproved: boolean;
}

interface Props {
  locale: string;

  translations: {
    title: string;
    description: string;
    viewResults: string;
    all: string;
    noTests: string;
    loadFailed: string;
    questions: string;
    startTest: string;
    buyNow: string;
    noDescription: string;
    uncategorized: string;
    buyMessage: string;
  };
}

const PsychologicalTestsClient = ({ locale, translations }: Props) => {
  const [category, setCategory] = useState("ALL");

  const [categories, setCategories] = useState<TestCategoryItem[]>([]);

  const [tests, setTests] = useState<PsychologicalTestItem[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [categoriesResult, testsResult] = await Promise.all([
          getTestCategories(),
          getTests(),
        ]);

        if (!categoriesResult.success) {
          toast.error(categoriesResult.message);
        } else {
          setCategories(categoriesResult.categories);
        }

        if (!testsResult.success) {
          toast.error(testsResult.message);
        } else {
          setTests(testsResult.tests);
        }
      } catch (error) {
        console.error(error);
        toast.error(translations.loadFailed);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [translations.loadFailed]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">{translations.title}</h1>

          <p className="mt-2 text-muted-foreground">
            {translations.description}
          </p>
        </div>

        {/* <Button className="rounded-xl">{translations.viewResults}</Button> */}
      </div>

      <TestsFilter
        value={category}
        onChange={setCategory}
        categories={categories}
        locale={locale}
        allLabel={translations.all}
      />

      <TestsGrid
        category={category}
        tests={tests}
        loading={loading}
        locale={locale}
        noTestsLabel={translations.noTests}
        translations={{
          questions: translations.questions,
          startTest: translations.startTest,
          buyNow: translations.buyNow,
          noDescription: translations.noDescription,
          uncategorized: translations.uncategorized,
          buyMessage: translations.buyMessage,
        }}
      />
    </div>
  );
};

export default PsychologicalTestsClient;
