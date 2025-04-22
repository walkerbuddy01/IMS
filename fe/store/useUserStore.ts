import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface IUser {
  email: string;
  fullname: string;
  avatar: string;
}

export const useUserStore = create(
  immer((set) => ({
    user: null,
    setUser: (user) => {
      set((state) => {
        state.user = user;
      });
    },
  }))
);
