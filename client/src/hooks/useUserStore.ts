import { create } from "zustand";
import { User } from "../types/user";

type UserStore = {
  user: User | null;
  setUser: (user: User) => void;
};

export const useUserStore = create<UserStore>((set) => {
  return {
    user: null,
    setUser: (user: User) => set((prev) => ({ ...prev, user })),
  };
});
