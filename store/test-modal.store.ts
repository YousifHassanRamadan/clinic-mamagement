import { create } from "zustand";

interface TestModalState {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  editingTestId: string | null;
  selectedTestId: string | null;

  openCreate: () => void;
  openEdit: (testId: string) => void;
  closeCreate: () => void;
  closeEdit: () => void;
  selectTest: (testId: string) => void;
  clearSelectedTest: () => void;
}

export const useTestModalStore = create<TestModalState>((set) => ({
  isCreateOpen: false,
  isEditOpen: false,
  editingTestId: null,
  selectedTestId: null,

  openCreate: () => {
    set({
      isCreateOpen: true,
      isEditOpen: false,
      editingTestId: null,
    });
  },

  openEdit: (testId) =>
    set({
      isCreateOpen: false,
      isEditOpen: true,
      editingTestId: testId,
    }),

  selectTest: (testId) => {
    set({ selectedTestId: testId });
  },

  clearSelectedTest: () => {
    set({ selectedTestId: null });
  },

  closeCreate: () =>
    set({
      isCreateOpen: false,
      isEditOpen: false,
      editingTestId: null,
    }),

  closeEdit: () =>
    set({
      isCreateOpen: false,
      isEditOpen: false,
      editingTestId: null,
    }),
}));
