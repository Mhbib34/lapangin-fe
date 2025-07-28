import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { BookingPage } from "@/type/bookings";

type BookingStore = {
  bookings: BookingPage;
  loading: boolean;
  fetchBooking: (page: number) => Promise<void>;
  setBooking: (booking: BookingPage) => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  bookings: {
    data: [],
    paging: {
      size: 0,
      total_page: 0,
      current_page: 0,
    },
  },
  loading: true,
  setBooking: (bookings: BookingPage) => set({ bookings }),
  fetchBooking: async (page: number = 1) => {
    try {
      const res = await axiosInstance.get("/api/bookings", {
        params: { page },
        withCredentials: true,
      });
      set({ bookings: res.data, loading: false });
      console.log(res.data);
    } catch (error) {
      set({
        bookings: {
          data: [],
          paging: { size: 0, total_page: 0, current_page: 0 },
        },
        loading: false,
      });
      console.error("Gagal mengambil data field", error);
    }
  },
}));
