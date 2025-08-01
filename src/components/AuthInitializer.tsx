"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useBookingStore } from "@/store/booking-store";

export default function AuthInitializer() {
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const fetchBookingByUser = useBookingStore(
    (state) => state.fetchBookingByUser
  );

  useEffect(() => {
    fetchUser();
    fetchBookingByUser();
    //eslint-disable-next-line
  }, []);

  return null;
}
