"use client";
import React, { useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  User,
  MapPin,
  Eye,
  Check,
  X,
  Download,
  RefreshCw,
} from "lucide-react";

enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELLED = "CANCELLED",
  COMPLETED = "COMPLETED",
}

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface Field {
  id: string;
  name: string;
  type: string;
  location: string;
  pricePerHour: number;
  image: string;
}

interface Booking {
  id: string;
  user: User;
  userId: string;
  field: Field;
  fieldId: string;
  startTime: Date;
  endTime: Date;
  status: BookingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const DataBookingPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [filterDate, setFilterDate] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Sample data
  const [bookingList, setBookingList] = useState<Booking[]>([
    {
      id: "1",
      userId: "user1",
      user: {
        id: "user1",
        name: "Ahmad Rizki",
        email: "ahmad.rizki@email.com",
        phone: "+62 812-3456-7890",
        avatar:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
      },
      fieldId: "field1",
      field: {
        id: "field1",
        name: "Lapangan Futsal Central",
        type: "Futsal",
        location: "Jl. Sudirman No. 123, Jakarta",
        pricePerHour: 150000,
        image:
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      },
      startTime: new Date("2024-07-26T10:00:00"),
      endTime: new Date("2024-07-26T12:00:00"),
      status: BookingStatus.CONFIRMED,
      createdAt: new Date("2024-07-25T15:30:00"),
      updatedAt: new Date("2024-07-25T15:30:00"),
    },
    {
      id: "2",
      userId: "user2",
      user: {
        id: "user2",
        name: "Sari Dewi",
        email: "sari.dewi@email.com",
        phone: "+62 856-7890-1234",
      },
      fieldId: "field2",
      field: {
        id: "field2",
        name: "Court Basketball Premium",
        type: "Basketball",
        location: "Jl. Thamrin No. 45, Jakarta",
        pricePerHour: 200000,
        image:
          "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400",
      },
      startTime: new Date("2024-07-26T14:00:00"),
      endTime: new Date("2024-07-26T16:00:00"),
      status: BookingStatus.PENDING,
      createdAt: new Date("2024-07-25T16:45:00"),
      updatedAt: new Date("2024-07-25T16:45:00"),
    },
    {
      id: "3",
      userId: "user3",
      user: {
        id: "user3",
        name: "Budi Santoso",
        email: "budi.santoso@email.com",
        phone: "+62 821-5678-9012",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      },
      fieldId: "field3",
      field: {
        id: "field3",
        name: "Lapangan Badminton Elite",
        type: "Badminton",
        location: "Jl. Gatot Subroto No. 78, Jakarta",
        pricePerHour: 120000,
        image:
          "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400",
      },
      startTime: new Date("2024-07-25T18:00:00"),
      endTime: new Date("2024-07-25T20:00:00"),
      status: BookingStatus.COMPLETED,
      createdAt: new Date("2024-07-24T10:15:00"),
      updatedAt: new Date("2024-07-25T20:00:00"),
    },
    {
      id: "4",
      userId: "user4",
      user: {
        id: "user4",
        name: "Maya Putri",
        email: "maya.putri@email.com",
        phone: "+62 877-2345-6789",
      },
      fieldId: "field1",
      field: {
        id: "field1",
        name: "Lapangan Futsal Central",
        type: "Futsal",
        location: "Jl. Sudirman No. 123, Jakarta",
        pricePerHour: 150000,
        image:
          "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      },
      startTime: new Date("2024-07-27T08:00:00"),
      endTime: new Date("2024-07-27T10:00:00"),
      status: BookingStatus.CANCELLED,
      createdAt: new Date("2024-07-25T09:20:00"),
      updatedAt: new Date("2024-07-25T11:30:00"),
    },
  ]);

  const getStatusConfig = (status: BookingStatus) => {
    switch (status) {
      case BookingStatus.PENDING:
        return {
          color: "text-amber-400 bg-amber-400/20",
          label: "Pending",
          icon: Clock,
        };
      case BookingStatus.CONFIRMED:
        return {
          color: "text-blue-400 bg-blue-400/20",
          label: "Dikonfirmasi",
          icon: Check,
        };
      case BookingStatus.COMPLETED:
        return {
          color: "text-emerald-400 bg-emerald-400/20",
          label: "Selesai",
          icon: Check,
        };
      case BookingStatus.CANCELLED:
        return {
          color: "text-red-400 bg-red-400/20",
          label: "Dibatalkan",
          icon: X,
        };
      default:
        return {
          color: "text-gray-400 bg-gray-400/20",
          label: status,
          icon: Clock,
        };
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const calculateDuration = (startTime: Date, endTime: Date) => {
    const diffMs = endTime.getTime() - startTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours;
  };

  const calculateTotal = (booking: Booking) => {
    const duration = calculateDuration(booking.startTime, booking.endTime);
    return duration * booking.field.pricePerHour;
  };

  const filteredBookings = bookingList.filter((booking) => {
    const matchesSearch =
      booking.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      filterStatus === "semua" || booking.status === filterStatus;

    const matchesDate =
      !filterDate ||
      booking.startTime.toISOString().split("T")[0] === filterDate;

    return matchesSearch && matchesStatus && matchesDate;
  });

  const updateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookingList((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: newStatus, updatedAt: new Date() }
          : booking
      )
    );
  };

  const getStatsData = () => {
    const total = bookingList.length;
    const pending = bookingList.filter(
      (b) => b.status === BookingStatus.PENDING
    ).length;
    const confirmed = bookingList.filter(
      (b) => b.status === BookingStatus.CONFIRMED
    ).length;
    const completed = bookingList.filter(
      (b) => b.status === BookingStatus.COMPLETED
    ).length;
    const totalRevenue = bookingList
      .filter((b) => b.status === BookingStatus.COMPLETED)
      .reduce((sum, booking) => sum + calculateTotal(booking), 0);

    return { total, pending, confirmed, completed, totalRevenue };
  };

  const stats = getStatsData();

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
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Download size={20} />
              Export Data
            </button>
            <button className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-medium hover:bg-white/30 transition-all duration-300 flex items-center gap-2 border border-white/30">
              <RefreshCw size={20} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
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

      {/* Search and Filter */}
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-8 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari nama user, lapangan, atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
            >
              <option value="semua">Semua Status</option>
              <option value={BookingStatus.PENDING}>Pending</option>
              <option value={BookingStatus.CONFIRMED}>Dikonfirmasi</option>
              <option value={BookingStatus.COMPLETED}>Selesai</option>
              <option value={BookingStatus.CANCELLED}>Dibatalkan</option>
            </select>

            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
            />
          </div>
        </div>
      </div>

      {/* Booking List */}
      <div className="space-y-4">
        {filteredBookings.map((booking) => {
          const statusConfig = getStatusConfig(booking.status);
          const StatusIcon = statusConfig.icon;
          const duration = calculateDuration(
            booking.startTime,
            booking.endTime
          );
          const total = calculateTotal(booking);

          return (
            <div
              key={booking.id}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                {/* User Info */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                    {booking.user.avatar &&
                      booking.user.name.charAt(0).toUpperCase()}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-lg font-semibold text-white truncate">
                      {booking.user.name}
                    </h3>
                    <p className="text-blue-100/80 text-sm truncate">
                      {booking.user.email}
                    </p>
                    <p className="text-blue-100/60 text-xs">
                      {booking.user.phone}
                    </p>
                  </div>
                </div>

                {/* Field Info */}
                <div className="flex items-center gap-4 min-w-0 flex-1">
                  <div className="w-16 h-12 rounded-lg overflow-hidden">
                    {/* <img
                      src={booking.field.image}
                      alt={booking.field.name}
                      className="w-full h-full object-cover"
                    /> */}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-white font-medium truncate">
                      {booking.field.name}
                    </h4>
                    <p className="text-blue-100/80 text-sm">
                      {booking.field.type}
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
                      {formatDate(booking.startTime)}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-blue-100/80">
                      <Clock size={14} />
                      <span>
                        {formatTime(booking.startTime)} -{" "}
                        {formatTime(booking.endTime)}
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
                    <StatusIcon size={14} />
                    <span className="text-sm font-medium">
                      {statusConfig.label}
                    </span>
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
                              booking.id,
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
                              booking.id,
                              BookingStatus.CANCELLED
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
                              booking.id,
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
                  Dibuat: {formatDate(booking.createdAt)}{" "}
                  {formatTime(booking.createdAt)}
                </span>
                <span>
                  Diupdate: {formatDate(booking.updatedAt)}{" "}
                  {formatTime(booking.updatedAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

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
                        {selectedBooking.id}
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
                      <p className="text-blue-100/80 text-sm">
                        Total Pembayaran
                      </p>
                      <p className="text-white text-xl font-bold">
                        Rp{" "}
                        {calculateTotal(selectedBooking).toLocaleString(
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
                        {formatDate(selectedBooking.startTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-100/80 text-sm">Waktu</p>
                      <p className="text-white">
                        {formatTime(selectedBooking.startTime)} -{" "}
                        {formatTime(selectedBooking.endTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-blue-100/80 text-sm">Durasi</p>
                      <p className="text-white">
                        {calculateDuration(
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
                      {selectedBooking.user.avatar &&
                        selectedBooking.user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {selectedBooking.user.name}
                      </p>
                      <p className="text-blue-100/80 text-sm">
                        {selectedBooking.user.email}
                      </p>
                      <p className="text-blue-100/80 text-sm">
                        {selectedBooking.user.phone}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Informasi Lapangan
                  </h3>
                  <div className="flex items-start gap-3">
                    <div className="w-16 h-12 rounded-lg overflow-hidden">
                      {/* <img
                        src={selectedBooking.field.image}
                        alt={selectedBooking.field.name}
                        className="w-full h-full object-cover"
                      /> */}
                    </div>
                    <div>
                      <p className="text-white font-semibold">
                        {selectedBooking.field.name}
                      </p>
                      <p className="text-blue-100/80 text-sm">
                        {selectedBooking.field.type}
                      </p>
                      <p className="text-blue-100/80 text-sm">
                        Rp{" "}
                        {selectedBooking.field.pricePerHour.toLocaleString(
                          "id-ID"
                        )}
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
                <h3 className="text-lg font-semibold text-white mb-4">
                  Riwayat
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100/80">Dibuat:</span>
                    <span className="text-white">
                      {formatDate(selectedBooking.createdAt)}{" "}
                      {formatTime(selectedBooking.createdAt)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-100/80">Terakhir diupdate:</span>
                    <span className="text-white">
                      {formatDate(selectedBooking.updatedAt)}{" "}
                      {formatTime(selectedBooking.updatedAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataBookingPage;
