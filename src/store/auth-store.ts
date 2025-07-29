import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { isErrorResponse } from "@/utils/error-response";
import { showSuccess } from "@/lib/sonnerToast";
import { User, UserPage } from "@/type/user";

type AuthStore = {
  user: User | null;
  loading: boolean;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  users: UserPage;
  listUsers: (page: number) => Promise<void>;
  setListUsers: (user: UserPage) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  users: {
    data: [],
    paging: {
      size: 0,
      total_page: 0,
      current_page: 0,
    },
  },
  loading: true,
  setUser: (user) => set({ user }),
  setListUsers: (users: UserPage) => set({ users }),
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
      set({ user: null, loading: false });
      showSuccess(res.data.message);
    } catch (error) {
      set({ loading: false });
      isErrorResponse(error, "Logout failed. Please try again.");
    }
  },

  listUsers: async (page: number = 1) => {
    try {
      const res = await axiosInstance.get("/api/users/list", {
        params: { page },
        withCredentials: true,
      });
      set({ users: res.data, loading: false });
      console.log(res.data);
    } catch (error) {
      set({
        users: {
          data: [],
          paging: { size: 0, total_page: 0, current_page: 0 },
        },
        loading: false,
      });
      console.error("Gagal mengambil data field", error);
    }
  },
}));
