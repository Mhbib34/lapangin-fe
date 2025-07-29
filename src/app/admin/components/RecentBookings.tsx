import { booking } from "@/type/bookings";
import { Field } from "@/type/fields";
import { Format } from "@/utils/format";
import { getLapanganStatusColor, getStatusConfig } from "@/utils/status";
import React from "react";

type Props = {
  recentBookings: booking[];
  recentFields: Field[];
};

const RecentBookings = ({ recentBookings, recentFields }: Props) => {
  return (
    <div className="flex justify-between gap-6">
      {/* Recent Bookings */}
      <div className="xl:col-span-2 w-[50%] bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Booking Terbaru</h3>
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
              </tr>
            </thead>
            <tbody>
              {recentBookings.map((booking) => (
                <tr
                  key={booking.bookingId}
                  className="border-b border-white/10 hover:bg-white/5 transition-all"
                >
                  <td className="py-4 font-medium">{booking.field.name}</td>
                  <td className="py-4 text-white/80">{booking.user.name}</td>
                  <td className="py-4 text-white/80">
                    {Format.formatDate(booking.createdAt)}
                  </td>
                  <td className="py-4 text-white/80">
                    {Format.formatTime(booking.createdAt)}
                  </td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        getStatusConfig(booking.status).color
                      }`}
                    >
                      {getStatusConfig(booking.status).label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="xl:col-span-2 w-[50%] bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold">Data Lapangan</h3>
        </div>

        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/20">
                <th className="text-left py-3 text-white/80 font-medium">
                  Nama
                </th>
                <th className="text-left py-3 text-white/80 font-medium">
                  Lokasi
                </th>
                <th className="text-left py-3 text-white/80 font-medium">
                  Harga Per Jam
                </th>
                <th className="text-left py-3 text-white/80 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {recentFields.map((field) => (
                <tr
                  key={field.id}
                  className="border-b border-white/10 hover:bg-white/5 transition-all"
                >
                  <td className="py-4 font-medium">{field.name}</td>
                  <td className="py-4 text-white/80">{field.location}</td>
                  <td className="py-4 text-white/80">{field.pricePerHour}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${getLapanganStatusColor(
                        field.status!
                      )}`}
                    >
                      {field.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentBookings;
