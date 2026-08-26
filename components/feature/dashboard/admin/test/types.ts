// types.ts

export type TestStatus = "ACTIVE" | "INACTIVE";

export interface TestOption {
  id: string;
  questionId?: string;
  text: string;
  textAr: string;
  points: number;
  order: number;
}

export interface TestQuestion {
  id: string;
  testId: string;
  question: string;
  questionAr: string;
  order: number;
  options: TestOption[];
}
