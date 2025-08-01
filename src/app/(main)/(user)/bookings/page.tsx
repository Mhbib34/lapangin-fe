"use client";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
} from "lucide-react";
import { useBookingStore } from "@/store/booking-store";
import Image from "next/image";
import { getStatusConfig } from "@/utils/status";
import { Format } from "@/utils/format";

const BookingsPage = () => {
  const bookingsByUser = useBookingStore((state) => state.bookingsByUser);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20">
        <h1 className="text-3xl font-bold text-white mb-2">Booking Saya</h1>
        <p className="text-white/70">
          Kelola dan pantau semua booking lapangan Anda
        </p>
      </div>

      {/* Booking Cards */}
      <div className="grid gap-6">
        {bookingsByUser.map((booking) => {
          const statusConfig = getStatusConfig(booking.status);
          const StatusIcon = statusConfig.icon;
          return (
            <div
              key={booking.bookingId}
              className="group backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 overflow-hidden hover:bg-white/15 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
            >
              <div className="p-6">
                {/* Header with Status */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-start gap-4">
                    <div className="relative rounded-2xl overflow-hidden group-hover:scale-105 transition-transform duration-300">
                      {booking.field.image && (
                        <Image
                          src={booking.field.image}
                          alt={booking.field.name}
                          width={200}
                          height={200}
                          className="w-24 h-18 object-cover"
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        {booking.field.name}
                      </h3>
                      <p className="text-white/60 text-sm mb-2">
                        {booking.field.category.name}
                      </p>
                      <div className="flex items-center gap-2 text-white/50 text-xs">
                        <MapPin className="w-3 h-3" />
                        <span>{booking.field.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusConfig.color}`}
                    >
                      <StatusIcon className="w-4 h-4" />
                      <span className="text-sm font-semibold">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Booking Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                  {/* Date & Time */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <span className="text-white/60 text-xs font-medium">
                        TANGGAL
                      </span>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      {Format.formatDate(booking.startTime)}
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-white/60 text-xs font-medium">
                        WAKTU
                      </span>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      {Format.formatTime(booking.startTime)} -{" "}
                      {Format.formatTime(booking.endTime)}
                    </p>
                    <p className="text-white/50 text-xs mt-1">
                      {Format.calculateDuration(
                        booking.startTime,
                        booking.endTime
                      )}{" "}
                      jam
                    </p>
                  </div>

                  {/* Customer Info */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="w-4 h-4 text-purple-400" />
                      <span className="text-white/60 text-xs font-medium">
                        PEMESAN
                      </span>
                    </div>
                    <p className="text-white font-semibold text-sm">
                      {booking.user.name}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <Phone className="w-3 h-3 text-white/40" />
                      <p className="text-white/50 text-xs">
                        {booking.user.phone || "-"}
                      </p>
                    </div>
                  </div>

                  {/* Payment */}
                  <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard className="w-4 h-4 text-yellow-400" />
                      <span className="text-white/60 text-xs font-medium">
                        PEMBAYARAN
                      </span>
                    </div>
                    <p className="text-white font-bold text-sm">
                      {Format.formatCurrency(booking.totalPrice)}
                    </p>
                  </div>
                </div>

                {/* Customer Contact & Notes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span className="text-white/60 text-xs font-medium">
                        EMAIL
                      </span>
                    </div>
                    <p className="text-white text-sm">{booking.user.email}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-white/10">
                  <div className="text-white/50 text-xs">
                    Dibuat: {Format.formatDate(booking.createdAt)}
                  </div>
                  <div className="text-white/40 text-xs">
                    ID: #{booking.bookingId}
                  </div>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {bookingsByUser.length === 0 && (
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-12 border border-white/20 text-center">
          <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">
            Belum Ada Booking
          </h3>
          <p className="text-white/60">
            Anda belum memiliki booking lapangan. Mulai booking sekarang!
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingsPage;
