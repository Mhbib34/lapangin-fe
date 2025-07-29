"use client";
import React, { useEffect, useState } from "react";
import { Calendar, RefreshCw } from "lucide-react";
import { useBookingStore } from "@/store/booking-store";
import { useShallow } from "zustand/shallow";
import { booking, BookingStatus } from "@/type/bookings";
import { FormatAdmin } from "@/utils/format";
import { getStatusConfig } from "@/utils/status";
import BookingModal from "./components/BookingModal";
import AdminStatsCard from "./components/StatsCard";
import BookingSearchAndFilter from "./components/BookingSearchAndFilter";
import BookingsCard from "./components/BookingsCard";
import { isErrorResponse } from "@/utils/error-response";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonnerToast";
import { useDebouncedValue } from "@/utils/useDebounce";
import Pagination from "../components/Pagination";

const DataBookingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [filterDate, setFilterDate] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<booking | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const useDebounce = useDebouncedValue(searchTerm, 500);

  const { fetchBooking, bookings } = useBookingStore(
    useShallow((s) => ({
      fetchBooking: s.fetchBooking,
      bookings: s.bookings,
    }))
  );

  useEffect(() => {
    fetchBooking(currentPage);
    //eslint-disable-next-line
  }, [currentPage]);

  useEffect(() => {
    const now = new Date();

    bookings.data.forEach((booking) => {
      const endTime = new Date(booking.endTime);
      if (
        booking.status === BookingStatus.CONFIRMED &&
        endTime.getTime() < now.getTime()
      ) {
        updateBookingStatus(booking.bookingId, BookingStatus.COMPLETED);
      }
    });
    // eslint-disable-next-line
  }, [bookings]);

  const filteredBookings = bookings.data.filter((booking) => {
    const matchesSearch =
      booking.field.name.toLowerCase().includes(useDebounce.toLowerCase()) ||
      booking.user.name.toLowerCase().includes(useDebounce.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(useDebounce.toLowerCase()) ||
      booking.field.location.toLowerCase().includes(useDebounce.toLowerCase());

    const matchesStatus =
      filterStatus === "semua" || booking.status === filterStatus;

    const matchesDate =
      !filterDate ||
      booking.startTime.toISOString().split("T")[0] === filterDate;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const updateBookingStatus = async (
    bookingId: string,
    newStatus: BookingStatus
  ) => {
    try {
      const res = await axiosInstance.patch(`/api/bookings/${bookingId}`, {
        status: newStatus,
      });
      console.log(res.data.message);
      showSuccess(res.data.message);
      fetchBooking(currentPage);
    } catch (error) {
      isErrorResponse(error, "Update booking status failed. Please try again.");
    }
  };

  const refreshBooking = () => {
    try {
      fetchBooking(currentPage);
      showSuccess("Berhasil refresh booking");
    } catch (error) {
      isErrorResponse(error, "Refresh booking gagal. Silahkan coba lagi.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text ">
              Data Booking
            </h1>
            <p className="text-blue-100/80">
              Kelola semua booking lapangan olahraga
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={refreshBooking}
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-300 flex items-center gap-2 border border-white/30"
            >
              <RefreshCw size={20} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <BookingSearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterStatus={filterStatus as BookingStatus}
        setFilterStatus={
          setFilterStatus as React.Dispatch<React.SetStateAction<BookingStatus>>
        }
        filterDate={filterDate}
        setFilterDate={setFilterDate}
      />

      {/* Booking List */}
      {filteredBookings.length > 0 && (
        <>
          {/* Stats Cards */}
          <AdminStatsCard bookings={bookings.data} />
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const statusConfig = getStatusConfig(booking.status);
              const StatusIcon = statusConfig.icon;
              const duration = FormatAdmin.calculateDuration(
                booking.startTime,
                booking.endTime
              );
              const total = FormatAdmin.calculateTotal(booking);

              return (
                <BookingsCard
                  key={booking.bookingId}
                  updateBookingStatus={updateBookingStatus}
                  booking={booking}
                  setSelectedBooking={setSelectedBooking}
                  setShowDetailModal={setShowDetailModal}
                  total={total}
                  duration={duration}
                  statusConfig={statusConfig}
                >
                  <StatusIcon size={14} />
                </BookingsCard>
              );
            })}
          </div>

          <Pagination
            currentPage={bookings.paging.current_page}
            totalPages={bookings.paging.total_page}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </>
      )}

      {filteredBookings.length === 0 && (
        <div className="text-center py-12">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 inline-block">
            <Calendar className="mx-auto text-white/60 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">
              Tidak ada booking ditemukan
            </h3>
            <p className="text-blue-100/80">
              Coba ubah kata kunci pencarian atau filter Anda
            </p>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedBooking && (
        <BookingModal
          selectedBooking={selectedBooking}
          setShowDetailModal={setShowDetailModal}
        />
      )}
    </div>
  );
};

export default DataBookingPage;
