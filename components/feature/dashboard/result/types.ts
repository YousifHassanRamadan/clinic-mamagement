export type TestStatus = "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

export interface TestResult {
  id: string;
  status: TestStatus;
  score: number | null;
  result: string | null;
  startedAt: string | Date | null;
  completedAt: string | Date | null;

  test: {
    id: string;
    title: string;
    description: string | null;

    category: {
      id: string;
      name: string;
    } | null;
  };
}
