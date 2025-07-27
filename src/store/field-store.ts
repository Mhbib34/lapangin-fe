import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { Field, FieldPage } from "@/type/fields";

type FieldStore = {
  fields: Field[];
  fieldsPage: FieldPage;
  loading: boolean;
  fetchField: () => Promise<void>;
  setFields: (fields: Field[]) => void;
  setFieldsPage: (fields: FieldPage) => void;
  fetchFieldPage: (page: number, name?: string) => Promise<void>;
};

export const useFieldStore = create<FieldStore>((set) => ({
  fields: [],
  fieldsPage: {
    data: [],
    paging: {
      size: 0,
      total_page: 0,
      current_page: 0,
    },
  },
  loading: true,
  setFields: (fields: Field[]) => set({ fields }),
  setFieldsPage: (fieldsPage: FieldPage) => set({ fieldsPage }),
  fetchField: async () => {
    try {
      const res = await axiosInstance.get("/api/fields", {
        withCredentials: true,
      });
      set({ fields: res.data.data, loading: false });
      console.log(res.data.data);
    } catch (error) {
      set({ fields: [], loading: false });
      console.error("Gagal mengambil data field", error);
    }
  },

  fetchFieldPage: async (page: number = 1, name?: string) => {
    try {
      const params: { page: number; size: number; name?: string } = {
        page,
        size: 9,
      };
      if (name?.trim()) params.name = name;
      const res = await axiosInstance.get(`/api/fields`, {
        params,
        withCredentials: true,
      });
      set({ fieldsPage: res.data, loading: false });
      console.log(res.data.data);
    } catch (error) {
      set({
        fieldsPage: {
          data: [],
          paging: { size: 0, total_page: 0, current_page: 0 },
        },
        loading: false,
      });
      console.error("Gagal mengambil data field", error);
    }
  },
}));
