import { Format } from "@/utils/format";
import { BarChart3 } from "lucide-react";
import React from "react";

type Props = {
  todayBookings: number;
  todayBookingsIncome: number;
  totalUsers: number;
};

const StatsCard = ({
  todayBookings,
  todayBookingsIncome,
  totalUsers,
}: Props) => {
  const stats = [
    {
      title: "Total Booking Hari Ini",
      value: todayBookings,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Pendapatan Hari Ini",
      value: Format.formatCurrency(todayBookingsIncome),
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Total Pengguna",
      value: totalUsers,
      color: "from-orange-500 to-red-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
        >
          <div className="flex items-center justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
            >
              <BarChart3 size={20} className="text-white" />
            </div>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
          <p className="text-white/60 text-sm">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
