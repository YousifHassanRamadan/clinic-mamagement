export interface TestOption {
  id: string;
  text: string;
  order: number;
}

export interface TestQuestion {
  id: string;
  question: string;
  order: number;
  options: TestOption[];
}

export interface StartedTest {
  id: string;
  patientTestId: string;
  title: string;
  description: string | null;
  isActive: boolean;
  questions: TestQuestion[];
}
