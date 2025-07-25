import { BarChart3 } from "lucide-react";
import React from "react";

const StatsCard = () => {
  const stats = [
    {
      title: "Total Booking Hari Ini",
      value: "24",
      change: "+12%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Pendapatan Bulan Ini",
      value: "Rp 15.2M",
      change: "+8.2%",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Lapangan Aktif",
      value: "12",
      change: "+2",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Pengguna Baru",
      value: "45",
      change: "+15%",
      color: "from-orange-500 to-red-500",
    },
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
            <span className="text-green-400 text-sm font-medium">
              {stat.change}
            </span>
          </div>
          <h3 className="text-2xl font-bold mb-1">{stat.value}</h3>
          <p className="text-white/60 text-sm">{stat.title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;
