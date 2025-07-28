import { booking, BookingStatus } from "@/type/bookings";
import { FormatAdmin } from "@/utils/format";
import { Calendar, Check, Clock, Download } from "lucide-react";
import React from "react";

const AdminStatsCard = ({ bookings }: { bookings: booking[] }) => {
  const getStatsData = () => {
    const total = bookings.length;
    const pending = bookings.filter(
      (b) => b.status === BookingStatus.PENDING
    ).length;
    const confirmed = bookings.filter(
      (b) => b.status === BookingStatus.CONFIRMED
    ).length;
    const completed = bookings.filter(
      (b) => b.status === BookingStatus.COMPLETED
    ).length;
    const totalRevenue = bookings
      .filter((b) => b.status === BookingStatus.COMPLETED)
      .reduce((sum, booking) => sum + FormatAdmin.calculateTotal(booking), 0);

    return { total, pending, confirmed, completed, totalRevenue };
  };
  const stats = getStatsData();
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      {[
        {
          label: "Total Booking",
          value: stats.total,
          color: "from-blue-500 to-cyan-500",
          icon: Calendar,
        },
        {
          label: "Pending",
          value: stats.pending,
          color: "from-amber-500 to-orange-500",
          icon: Clock,
        },
        {
          label: "Dikonfirmasi",
          value: stats.confirmed,
          color: "from-blue-500 to-indigo-500",
          icon: Check,
        },
        {
          label: "Selesai",
          value: stats.completed,
          color: "from-emerald-500 to-teal-500",
          icon: Check,
        },
        {
          label: "Total Pendapatan",
          value: `Rp ${stats.totalRevenue.toLocaleString("id-ID")}`,
          color: "from-purple-500 to-pink-500",
          icon: Download,
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}
          >
            <stat.icon className="text-white" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{stat.value}</h3>
          <p className="text-blue-100/80 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminStatsCard;
