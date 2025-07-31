import { create } from "zustand";
import axiosInstance from "@/lib/axiosInstance";
import { booking, BookingPage } from "@/type/bookings";

type BookingStore = {
  bookings: BookingPage;
  bookingsByUser: booking[];
  loading: boolean;
  fetchBooking: (page: number) => Promise<void>;
  setBooking: (booking: BookingPage) => void;
  fetchBookingByUser: () => Promise<void>;
  setBookingByUser: (booking: booking[]) => void;
};

export const useBookingStore = create<BookingStore>((set) => ({
  bookingsByUser: [],
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
  setBookingByUser: (bookings: booking[]) => set({ bookingsByUser: bookings }),
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

  fetchBookingByUser: async () => {
    try {
      const res = await axiosInstance.get(`/api/bookings/users`, {
        withCredentials: true,
      });
      set({ bookingsByUser: res.data, loading: false });
    } catch (error) {
      set({ bookingsByUser: [], loading: false });
      console.error("Gagal mengambil data field", error);
    }
  },
}));
