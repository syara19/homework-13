import { create } from "zustand";

const useAuthStore = create((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (login) => {
    set({ isLoggedIn: login });
  },
}));

export default useAuthStore;
