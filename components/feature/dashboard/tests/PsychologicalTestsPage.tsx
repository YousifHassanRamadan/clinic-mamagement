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
  description: string | null;
  _count: {
    tests: number;
  };
}

export interface PsychologicalTestItem {
  id: string;
  title: string;
  description: string | null;
  category: {
    id: string;
    name: string;
  } | null;
  _count: {
    questions: number;
  };
}

const PsychologicalTestsPage = () => {
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
        toast.error("Failed to load psychological tests");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Psychological Tests</h1>

          <p className="mt-2 text-muted-foreground">
            Short, validated screenings. Your results go directly to your
            therapist.
          </p>
        </div>

        <Button className="rounded-xl">View Results</Button>
      </div>

      <TestsFilter
        value={category}
        onChange={setCategory}
        categories={categories}
      />

      <TestsGrid category={category} tests={tests} loading={loading} />
    </div>
  );
};

export default PsychologicalTestsPage;
