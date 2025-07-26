import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";

export type Field = {
  id: string;
  name: string;
  location: string;
  description?: string | null;
  image?: string | null;
  pricePerHour: number;
  category: string;
  operationalHour?: string | null;
  capacity: number;
  status?: string | null;
};

type FieldStore = {
  fields: Field[];
  loading: boolean;
  fetchField: () => Promise<void>;
  setFields: (fields: Field[]) => void;
};

export const useFieldStore = create<FieldStore>((set) => ({
  fields: [],
  loading: true,
  setFields: (fields: Field[]) => set({ fields }),
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
}));
