export type TestStatus = "ACTIVE" | "INACTIVE";

export interface TestOption {
  id: string;
  questionId?: string;
  text: string;
  points: number;
  order: number;
}

export interface TestQuestion {
  id: string;
  testId: string;
  question: string;
  order: number;
  options: TestOption[];
}
