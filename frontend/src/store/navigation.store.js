import { create } from "zustand";

export const useNavigationStore = create((set) => ({
  isLoading: false,
  startLoading: () => {
    set({ isLoading: true });
    setTimeout(() => {
      set({ isLoading: false });
    }, 2000);
  },
  stopLoading: () => set({ isLoading: false }),
}));
