"use client";
import React, { useState } from "react";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Clock,
  Users,
  Star,
} from "lucide-react";
import Image from "next/image";
import AddLapanganModal from "./components/AddLapanganModal";
import { isErrorResponse } from "@/utils/error-response";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonnerToast";

interface Lapangan {
  id: string;
  nama: string;
  jenis: string;
  lokasi: string;
  harga: number;
  rating: number;
  kapasitas: number;
  fasilitas: string[];
  status: "aktif" | "nonaktif" | "maintenance";
  gambar: string;
  jamOperasional: string;
  totalBooking: number;
}

const DataLapanganPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJenis, setFilterJenis] = useState("semua");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true); // start loading
    try {
      const formAddLapangan = new FormData(e.currentTarget);

      const res = await axiosInstance.post("/api/fields", formAddLapangan, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      showSuccess(res.data.message);
      setShowAddModal(false);
    } catch (error) {
      isErrorResponse(error, "Add lapangan failed. Please try again.");
    } finally {
      setIsSubmitting(false); // stop loading
    }
  };
  // Sample data
  const [lapanganList, setLapanganList] = useState<Lapangan[]>([
    {
      id: "1",
      nama: "Lapangan Futsal Central",
      jenis: "Futsal",
      lokasi: "Jl. Sudirman No. 123, Jakarta",
      harga: 150000,
      rating: 4.8,
      kapasitas: 12,
      fasilitas: ["AC", "Parkir", "Toilet", "Kantin"],
      status: "aktif",
      gambar: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400",
      jamOperasional: "06:00 - 23:00",
      totalBooking: 245,
    },
    {
      id: "2",
      nama: "Court Basketball Premium",
      jenis: "Basketball",
      lokasi: "Jl. Thamrin No. 45, Jakarta",
      harga: 200000,
      rating: 4.6,
      kapasitas: 10,
      fasilitas: ["AC", "Sound System", "Parkir", "Toilet"],
      status: "aktif",
      gambar: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400",
      jamOperasional: "07:00 - 22:00",
      totalBooking: 189,
    },
    {
      id: "3",
      nama: "Lapangan Badminton Elite",
      jenis: "Badminton",
      lokasi: "Jl. Gatot Subroto No. 78, Jakarta",
      harga: 120000,
      rating: 4.7,
      kapasitas: 4,
      fasilitas: ["AC", "Parkir", "Toilet", "Shower"],
      status: "maintenance",
      gambar: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400",
      jamOperasional: "06:00 - 22:00",
      totalBooking: 156,
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "aktif":
        return "text-emerald-400 bg-emerald-400/20";
      case "nonaktif":
        return "text-red-400 bg-red-400/20";
      case "maintenance":
        return "text-amber-400 bg-amber-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const filteredLapangan = lapanganList.filter((lapangan) => {
    const matchesSearch =
      lapangan.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lapangan.lokasi.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJenis =
      filterJenis === "semua" || lapangan.jenis === filterJenis;
    const matchesStatus =
      filterStatus === "semua" || lapangan.status === filterStatus;

    return matchesSearch && matchesJenis && matchesStatus;
  });

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text">
                Data Lapangan
              </h1>
              <p className="text-blue-100/80">
                Kelola semua lapangan olahraga Anda
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Plus size={20} />
                Tambah Lapangan
              </button>
            </div>
          </div>
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
                placeholder="Cari nama lapangan atau lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <select
                value={filterJenis}
                onChange={(e) => setFilterJenis(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
              >
                <option value="semua">Semua Jenis</option>
                <option value="Futsal">Futsal</option>
                <option value="Basketball">Basketball</option>
                <option value="Badminton">Badminton</option>
                <option value="Tenis">Tenis</option>
              </select>

              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
              >
                <option value="semua">Semua Status</option>
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Non-aktif</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            {
              label: "Total Lapangan",
              value: lapanganList.length,
              color: "from-blue-500 to-cyan-500",
              icon: MapPin,
            },
            {
              label: "Lapangan Aktif",
              value: lapanganList.filter((l) => l.status === "aktif").length,
              color: "from-emerald-500 to-teal-500",
              icon: Users,
            },
            {
              label: "Total Booking",
              value: lapanganList.reduce((sum, l) => sum + l.totalBooking, 0),
              color: "from-purple-500 to-pink-500",
              icon: Clock,
            },
            {
              label: "Rating Rata-rata",
              value: (
                lapanganList.reduce((sum, l) => sum + l.rating, 0) /
                lapanganList.length
              ).toFixed(1),
              color: "from-amber-500 to-orange-500",
              icon: Star,
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
              <h3 className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-blue-100/80 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Lapangan Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredLapangan.map((lapangan) => (
            <div
              key={lapangan.id}
              className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={lapangan.gambar}
                  alt={lapangan.nama}
                  fill
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      lapangan.status
                    )}`}
                  >
                    {lapangan.status}
                  </span>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
                    {lapangan.jenis}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
                    {lapangan.nama}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="text-amber-400 fill-current" size={16} />
                    <span className="text-white font-medium">
                      {lapangan.rating}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-blue-100/80">
                    <MapPin size={16} />
                    <span className="text-sm">{lapangan.lokasi}</span>
                  </div>

                  <div className="flex items-center gap-2 text-blue-100/80">
                    <Clock size={16} />
                    <span className="text-sm">{lapangan.jamOperasional}</span>
                  </div>

                  <div className="flex items-center gap-2 text-blue-100/80">
                    <Users size={16} />
                    <span className="text-sm">
                      Kapasitas: {lapangan.kapasitas} orang
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {lapangan.fasilitas.slice(0, 3).map((fasilitas, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-white/20 rounded-lg text-xs text-white"
                    >
                      {fasilitas}
                    </span>
                  ))}
                  {lapangan.fasilitas.length > 3 && (
                    <span className="px-2 py-1 bg-white/20 rounded-lg text-xs text-white">
                      +{lapangan.fasilitas.length - 3} lainnya
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-2xl font-bold text-white">
                      Rp {lapangan.harga.toLocaleString("id-ID")}
                    </span>
                    <span className="text-blue-100/80 text-sm">/jam</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg text-blue-200 hover:bg-blue-500/30 transition-colors">
                      <Edit size={18} />
                    </button>
                    <button className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg text-red-200 hover:bg-red-500/30 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-white/20">
                  <div className="flex justify-between text-sm text-blue-100/80">
                    <span>Total Booking:</span>
                    <span className="font-medium text-white">
                      {lapangan.totalBooking}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredLapangan.length === 0 && (
          <div className="text-center py-12">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 inline-block">
              <MapPin className="mx-auto text-white/60 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-2">
                Tidak ada lapangan ditemukan
              </h3>
              <p className="text-blue-100/80">
                Coba ubah kata kunci pencarian atau filter Anda
              </p>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddLapanganModal
          handleSubmit={handleSubmit}
          setShowAddModal={setShowAddModal}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
};

export default DataLapanganPage;
