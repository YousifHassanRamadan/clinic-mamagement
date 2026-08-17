import { create } from "zustand";

interface CategoryModalState {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  editingCategoryId: string | null;

  openCreate: () => void;
  openEdit: (categoryId: string) => void;
  closeCreate: () => void;
  closeEdit: () => void;
}

export const useCategoryModalStore = create<CategoryModalState>((set) => ({
  isCreateOpen: false,
  isEditOpen: false,
  editingCategoryId: null,
  openCreate: () => {
    set({
      isCreateOpen: true,
      editingCategoryId: null,
    });
  },

  openEdit: (categoryId) =>
    set({
      isCreateOpen: false,
      isEditOpen: true,
      editingCategoryId: categoryId,
    }),

  closeCreate: () =>
    set({
      isCreateOpen: false,
      isEditOpen: false,
      editingCategoryId: null,
    }),

  closeEdit: () =>
    set({
      isCreateOpen: false,
      isEditOpen: false,
      editingCategoryId: null,
    }),
}));
