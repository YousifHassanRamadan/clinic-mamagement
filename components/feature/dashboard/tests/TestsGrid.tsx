"use client";

import TestCard from "./TestCard";

import { PsychologicalTestItem } from "./PsychologicalTestsPage";

interface Props {
  category: string;
  tests: PsychologicalTestItem[];
  loading: boolean;
}

const TestsGrid = ({ category, tests, loading }: Props) => {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="h-64 animate-pulse rounded-3xl border bg-muted/40"
          />
        ))}
      </div>
    );
  }

  const filteredTests =
    category === "ALL"
      ? tests
      : tests.filter((test) => test.category?.id === category);

  if (filteredTests.length === 0) {
    return (
      <div className="rounded-3xl border p-10 text-center">
        <p className="text-muted-foreground">No psychological tests found.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {filteredTests.map((test) => (
        <TestCard key={test.id} test={test} />
      ))}
    </div>
  );
};

export default TestsGrid;
