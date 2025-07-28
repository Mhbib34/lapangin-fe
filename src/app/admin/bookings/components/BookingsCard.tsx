import { booking, BookingStatus } from "@/type/bookings";
import { Format } from "@/utils/format";
import { Check, Clock, Eye, LucideProps, MapPin, X } from "lucide-react";
import React, { ForwardRefExoticComponent } from "react";

type Props = {
  booking: booking;
  setSelectedBooking: React.Dispatch<React.SetStateAction<booking | null>>;
  setShowDetailModal: React.Dispatch<React.SetStateAction<boolean>>;
  total: number;
  duration: number;
  statusConfig: {
    color: string;
    icon: ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    label: string;
  };
  children?: React.ReactNode;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
};

const BookingsCard = ({
  booking,
  setSelectedBooking,
  setShowDetailModal,
  total,
  duration,
  statusConfig,
  children,
  updateBookingStatus,
}: Props) => {
  return (
    <div
      key={booking.bookingId}
      className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
    >
      <div className="flex flex-col lg:flex-row lg:items-center gap-6">
        {/* User Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
            {booking.user.name.charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-white truncate">
              {booking.user.name}
            </h3>
            <p className="text-blue-100/80 text-sm truncate">
              {booking.user.email}
            </p>
            <p className="text-blue-100/60 text-xs">{booking.user.username}</p>
          </div>
        </div>

        {/* Field Info */}
        <div className="flex items-center gap-4 min-w-0 flex-1">
          <div className="min-w-0 flex-1">
            <h4 className="text-white font-medium truncate">
              {booking.field.name}
            </h4>
            <p className="text-blue-100/80 text-sm">
              {booking.field.category.name}
            </p>
            <div className="flex items-center gap-1 text-blue-100/60 text-xs">
              <MapPin size={12} />
              <span className="truncate">{booking.field.location}</span>
            </div>
          </div>
        </div>

        {/* Booking Details */}
        <div className="flex-1">
          <div className="text-white">
            <p className="font-medium">
              {Format.formatDate(booking.startTime)}
            </p>
            <div className="flex items-center gap-2 text-sm text-blue-100/80">
              <Clock size={14} />
              <span>
                {Format.formatTime(booking.startTime)} -{" "}
                {Format.formatTime(booking.endTime)}
              </span>
              <span className="text-blue-100/60">({duration} jam)</span>
            </div>
            <p className="text-lg font-bold text-white mt-1">
              Rp {total.toLocaleString("id-ID")}
            </p>
          </div>
        </div>

        {/* Status & Actions */}
        <div className="flex items-center gap-4">
          <div
            className={`px-3 py-1.5 rounded-lg ${statusConfig.color} flex items-center gap-2`}
          >
            {children}
            <span className="text-sm font-medium">{statusConfig.label}</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                setSelectedBooking(booking);
                setShowDetailModal(true);
              }}
              className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg text-blue-200 hover:bg-blue-500/30 transition-colors"
            >
              <Eye size={18} />
            </button>

            {booking.status === BookingStatus.PENDING && (
              <>
                <button
                  onClick={() =>
                    updateBookingStatus(
                      booking.bookingId,
                      BookingStatus.CONFIRMED
                    )
                  }
                  className="p-2 bg-emerald-500/20 backdrop-blur-sm rounded-lg text-emerald-200 hover:bg-emerald-500/30 transition-colors"
                >
                  <Check size={18} />
                </button>
                <button
                  onClick={() =>
                    updateBookingStatus(
                      booking.bookingId,
                      BookingStatus.CANCELED
                    )
                  }
                  className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg text-red-200 hover:bg-red-500/30 transition-colors"
                >
                  <X size={18} />
                </button>
              </>
            )}

            {booking.status === BookingStatus.CONFIRMED &&
              new Date() > booking.endTime && (
                <button
                  onClick={() =>
                    updateBookingStatus(
                      booking.bookingId,
                      BookingStatus.COMPLETED
                    )
                  }
                  className="p-2 bg-purple-500/20 backdrop-blur-sm rounded-lg text-purple-200 hover:bg-purple-500/30 transition-colors"
                  title="Tandai Selesai"
                >
                  <Check size={18} />
                </button>
              )}
          </div>
        </div>
      </div>

      {/* Booking Metadata */}
      <div className="mt-4 pt-4 border-t border-white/20 flex justify-between text-xs text-blue-100/60">
        <span>
          Dibuat: {Format.formatDate(booking.createdAt)}{" "}
          {Format.formatTime(booking.createdAt)}
        </span>
      </div>
    </div>
  );
};

export default BookingsCard;
