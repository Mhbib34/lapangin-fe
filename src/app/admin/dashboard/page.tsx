"use client";
import StatsCard from "../components/StatsCard";
import RecentBookings from "../components/RecentBookings";
import { useShallow } from "zustand/shallow";
import { useBookingStore } from "@/store/booking-store";
import { useEffect } from "react";
import { FormatAdmin } from "@/utils/format";
import { useAuthStore } from "@/store/auth-store";
import { useFieldStore } from "@/store/field-store";

const AdminDashboard: React.FC = () => {
  const { listUsers, users } = useAuthStore(
    useShallow((s) => ({
      listUsers: s.listUsers,
      users: s.users,
    }))
  );

  const { fields, fetchField } = useFieldStore(
    useShallow((s) => ({
      fields: s.fields,
      fetchField: s.fetchField,
    }))
  );
  const { fetchBooking, bookings } = useBookingStore(
    useShallow((s) => ({
      fetchBooking: s.fetchBooking,
      bookings: s.bookings,
    }))
  );

  const todaysBookings = bookings.data.filter((b) => {
    const bookingDate = new Date(b.createdAt);
    const today = new Date();
    return (
      bookingDate.getDate() === today.getDate() &&
      bookingDate.getMonth() === today.getMonth() &&
      bookingDate.getFullYear() === today.getFullYear()
    );
  });

  const todaysBookingsIncome = todaysBookings.reduce((sum, booking) => {
    return sum + FormatAdmin.calculateTotal(booking);
  }, 0);

  useEffect(() => {
    fetchBooking(1);
    listUsers();
    fetchField();
    //eslint-disable-next-line
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <StatsCard
        todayBookings={todaysBookings.length}
        todayBookingsIncome={todaysBookingsIncome}
        totalUsers={users.length}
      />

      {/* Main Content Grid */}
      <RecentBookings recentBookings={bookings.data} recentFields={fields} />
    </div>
  );
};

export default AdminDashboard;
