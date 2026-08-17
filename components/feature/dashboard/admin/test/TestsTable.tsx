"use client";

import { useEffect, useState } from "react";

import { getTests } from "@/app/actions/admin-actions/test/get-tests";

import TestRow from "./TestRow";

interface TestsTableProps {
  search: string;
  status: "all" | "active" | "inactive";
  categoryId: string;
}

const TestsTable = ({ search, status, categoryId }: TestsTableProps) => {
  const [tests, setTests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return (
      <div className="py-10 text-center text-sm text-muted-foreground">
        Loading tests...
      </div>
    );
  }

  if (tests.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-sm text-muted-foreground">No tests found.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[850px] border-collapse">
        <thead>
          <tr className="border-b bg-muted/20">
            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground sm:px-5">
              Test
            </th>

            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              Category
            </th>

            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              Questions
            </th>

            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              Duration
            </th>

            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              Status
            </th>

            <th className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
              Completions
            </th>

            <th className="px-4 py-3 text-right text-xs font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {tests.map((test) => (
            <TestRow key={test.id} test={test} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestsTable;
