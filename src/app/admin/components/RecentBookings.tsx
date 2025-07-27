import { recentBookings } from "@/utils/admin";
import { getStatusColor, getStatusText } from "@/utils/status";
import {
  BarChart3,
  Calendar,
  Edit,
  Eye,
  Filter,
  Plus,
  Settings,
  Trash2,
} from "lucide-react";
import React from "react";

const RecentBookings = () => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      {/* Recent Bookings */}
      <div className="xl:col-span-2 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Booking Terbaru</h3>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all">
              <Filter size={16} />
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-lg transition-all">
              <Plus size={16} className="inline mr-2" />
              Tambah Booking
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 text-white/80 font-medium">
                  Lapangan
                </th>
                <th className="text-left py-3 text-white/80 font-medium">
                  Pengguna
                </th>
                <th className="text-left py-3 text-white/80 font-medium">
                  Tanggal
                </th>
                <th className="text-left py-3 text-white/80 font-medium">
                  Waktu
                </th>
                <th className="text-left py-3 text-white/80 font-medium">
                  Status
                </th>
                <th className="text-left py-3 text-white/80 font-medium">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-all"
                >
                  <td className="py-4 font-medium">{booking.venue}</td>
                  <td className="py-4 text-white/80">{booking.user}</td>
                  <td className="py-4 text-white/80">{booking.date}</td>
                  <td className="py-4 text-white/80">{booking.time}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusText(booking.status)}
                    </span>
                  </td>
                  <td className="py-4">
                    <div className="flex space-x-2">
                      <button className="p-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
                        <Eye size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all">
                        <Edit size={14} />
                      </button>
                      <button className="p-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        {/* Quick Stats */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-lg font-bold mb-4">Statistik Cepat</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/80">Booking Hari Ini</span>
              <span className="font-bold">24</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Pendapatan Hari Ini</span>
              <span className="font-bold">Rp 2.4M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Lapangan Tersedia</span>
              <span className="font-bold">8/12</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/80">Pengguna Online</span>
              <span className="font-bold">156</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
          <h3 className="text-lg font-bold mb-4">Aksi Cepat</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 hover:shadow-lg transition-all">
              <Plus size={16} />
              <span>Tambah Lapangan</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
              <Calendar size={16} />
              <span>Lihat Jadwal</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
              <BarChart3 size={16} />
              <span>Generate Laporan</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
              <Settings size={16} />
              <span>Pengaturan Sistem</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentBookings;
