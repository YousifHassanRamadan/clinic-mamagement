export interface TestResult {
  id: string;
  status: string;
  score: number | null;
  result: string | null;
  resultAr: string | null;
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
}
