import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { isErrorResponse } from "@/utils/error-response";
import { showSuccess } from "@/lib/sonnerToast";
import { User } from "@/type/user";

type AuthStore = {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    try {
      const res = await axiosInstance.get("/api/users", {
        withCredentials: true,
      });
      set({ user: res.data.data, loading: false });
      console.log(res.data.data);
      //eslint-disable-next-line
    } catch (error) {
      set({ user: null, loading: false });
    }
  },
  logout: async () => {
    try {
      const res = await axiosInstance.delete("/api/users", {
        withCredentials: true,
      });
      set({ user: null });
      showSuccess(res.data.message);
    } catch (error) {
      isErrorResponse(error, "Logout failed. Please try again.");
    }
  },
}));
