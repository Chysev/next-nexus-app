import { create } from "zustand";

type ModalState = {
  isOpen: boolean;
  id: string | null;
  openModal: (id: string) => void;
  closeModal: () => void;
};

const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  id: null,
  openModal: (id: string) => set({ isOpen: true, id }),
  closeModal: () => set({ isOpen: false, id: null }),
}));

export { useModalStore };
