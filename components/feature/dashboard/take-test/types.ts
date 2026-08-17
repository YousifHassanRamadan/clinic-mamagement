export interface AnswerOption {
  id: number;
  label: string;
  value: number;
}

export interface Question {
  id: number;
  title: string;
  options: AnswerOption[];
}
