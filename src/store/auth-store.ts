import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

type User = {
  id: string;
  email: string;
  name: string;
  isAccountVerified: boolean;
  role: string;
};

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
    } catch (err) {
      set({ user: null, loading: false });
    }
  },
  logout: async () => {
    try {
      await axiosInstance.delete("/api/users", { withCredentials: true });
      set({ user: null });
    } catch (err) {
      console.error("Logout gagal", err);
    }
  },
}));
