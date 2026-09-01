// components/feature/dashboard/patient/tests/types.ts

export type GroupResult = {
  group: number;
  score: number;
  result: string;
  resultAr: string;
};

export type TestResult = {
  id: string;

  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";

  score: number | null;

  result: string | null;

  resultAr: string | null;

  groupResults: GroupResult[] | null;

  isSpecialGroupedTest: boolean;

  startedAt: Date | null;

  completedAt: Date | null;

  test: {
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
  };
};
