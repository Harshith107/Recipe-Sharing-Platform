import { create } from "zustand";

interface EditModalState {
  isOpen: boolean;
  selectedRecipe: any | null;
  openModal: (recipe: any) => void;
  closeModal: () => void;
}

export const useEditModal = create<EditModalState>((set) => ({
  isOpen: false,
  selectedRecipe: null,
  openModal: (recipe) => set({ isOpen: true, selectedRecipe: recipe }),
  closeModal: () => set({ isOpen: false, selectedRecipe: null }),
}));
