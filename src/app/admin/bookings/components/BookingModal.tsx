import { booking } from "@/type/bookings";
import { Format, FormatAdmin } from "@/utils/format";
import { getStatusConfig } from "@/utils/status";
import { MapPin, X } from "lucide-react";
import React from "react";

type Props = {
  selectedBooking: booking;
  setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const BookingModal = ({ selectedBooking, setShowDetailModal }: Props) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Detail Booking</h2>
          <button
            onClick={() => setShowDetailModal(false)}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Booking Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Informasi Booking
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-100/80 text-sm">ID Booking</p>
                  <p className="text-white font-mono">
                    {selectedBooking.bookingId}
                  </p>
                </div>
                <div>
                  <p className="text-blue-100/80 text-sm">Status</p>
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg ${
                      getStatusConfig(selectedBooking.status).color
                    } mt-1`}
                  >
                    <span className="text-sm font-medium">
                      {getStatusConfig(selectedBooking.status).label}
                    </span>
                  </div>
                </div>
                <div>
                  <p className="text-blue-100/80 text-sm">Total Pembayaran</p>
                  <p className="text-white text-xl font-bold">
                    Rp{" "}
                    {FormatAdmin.calculateTotal(selectedBooking).toLocaleString(
                      "id-ID"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Waktu & Durasi
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-blue-100/80 text-sm">Tanggal</p>
                  <p className="text-white">
                    {Format.formatDate(selectedBooking.startTime)}
                  </p>
                </div>
                <div>
                  <p className="text-blue-100/80 text-sm">Waktu</p>
                  <p className="text-white">
                    {Format.formatTime(selectedBooking.startTime)} -{" "}
                    {Format.formatTime(selectedBooking.endTime)}
                  </p>
                </div>
                <div>
                  <p className="text-blue-100/80 text-sm">Durasi</p>
                  <p className="text-white">
                    {FormatAdmin.calculateDuration(
                      selectedBooking.startTime,
                      selectedBooking.endTime
                    )}{" "}
                    jam
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User & Field Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Informasi Customer
              </h3>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold overflow-hidden">
                  {selectedBooking.user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-semibold">
                    {selectedBooking.user.name}
                  </p>
                  <p className="text-blue-100/80 text-sm">
                    {selectedBooking.user.email}
                  </p>
                  <p className="text-blue-100/80 text-sm">
                    {selectedBooking.user.username}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Informasi Lapangan
              </h3>
              <div className="flex items-start gap-3">
                <div>
                  <p className="text-white font-semibold">
                    {selectedBooking.field.name}
                  </p>
                  <p className="text-blue-100/80 text-sm">
                    {selectedBooking.field.category.name}
                  </p>
                  <p className="text-blue-100/80 text-sm">
                    Rp{" "}
                    {selectedBooking.field.pricePerHour.toLocaleString("id-ID")}
                    /jam
                  </p>
                  <div className="flex items-center gap-1 text-blue-100/60 text-xs mt-1">
                    <MapPin size={12} />
                    <span>{selectedBooking.field.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timestamps */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Riwayat</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-blue-100/80">Dibuat:</span>
                <span className="text-white">
                  {Format.formatDate(selectedBooking.createdAt)}{" "}
                  {Format.formatTime(selectedBooking.createdAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
