export type TestCategory =
  | "ALL"
  | "ANXIETY"
  | "MOOD"
  | "STRESS"
  | "TRAUMA"
  | "SLEEP"
  | "WELLBEING";

export interface PsychologicalTest {
  id: number;

  title: string;

  description: string;

  category: TestCategory;

  duration: number;

  questions: number;
}
