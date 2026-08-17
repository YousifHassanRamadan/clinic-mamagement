import { create } from "zustand";

interface TestStore {
  selectedTestId: string | null;

  setSelectedTestId: (testId: string) => void;
  clearSelectedTestId: () => void;
}

export const useTestStore = create<TestStore>((set) => ({
  selectedTestId: null,

  setSelectedTestId: (testId) =>
    set({
      selectedTestId: testId,
    }),

  clearSelectedTestId: () =>
    set({
      selectedTestId: null,
    }),
}));
