"use client";
import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Download,
  Calendar,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  totalBookings: number;
  status: "active" | "inactive" | "suspended";
  avatar: string;
  lastLogin: string;
}

const UserDataPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Sample data
  useEffect(() => {
    const sampleUsers: User[] = [
      {
        id: "1",
        name: "Ahmad Rizki",
        email: "ahmad.rizki@email.com",
        phone: "+62 812-3456-7890",
        location: "Jakarta Selatan",
        joinDate: "2024-01-15",
        totalBookings: 25,
        status: "active",
        avatar: "🏃‍♂️",
        lastLogin: "2024-07-24",
      },
      {
        id: "2",
        name: "Sari Dewi",
        email: "sari.dewi@email.com",
        phone: "+62 813-9876-5432",
        location: "Bandung",
        joinDate: "2024-02-20",
        totalBookings: 18,
        status: "active",
        avatar: "🏋️‍♀️",
        lastLogin: "2024-07-23",
      },
      {
        id: "3",
        name: "Budi Santoso",
        email: "budi.santoso@email.com",
        phone: "+62 814-1111-2222",
        location: "Surabaya",
        joinDate: "2024-03-10",
        totalBookings: 12,
        status: "inactive",
        avatar: "⚽",
        lastLogin: "2024-07-15",
      },
      {
        id: "4",
        name: "Maya Sari",
        email: "maya.sari@email.com",
        phone: "+62 815-3333-4444",
        location: "Medan",
        joinDate: "2024-04-05",
        totalBookings: 31,
        status: "active",
        avatar: "🏸",
        lastLogin: "2024-07-24",
      },
      {
        id: "5",
        name: "Eko Prasetyo",
        email: "eko.prasetyo@email.com",
        phone: "+62 816-5555-6666",
        location: "Yogyakarta",
        joinDate: "2024-05-12",
        totalBookings: 7,
        status: "suspended",
        avatar: "🏀",
        lastLogin: "2024-07-20",
      },
    ];
    setUsers(sampleUsers);
  }, []);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-300 border-green-500/30";
      case "inactive":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-500/30";
      case "suspended":
        return "bg-red-500/20 text-red-300 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-500/30";
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Data User Lapagin
            </h1>
            <p className="text-white/70 text-lg">
              Kelola data pengguna aplikasi booking lapangan olahraga
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="backdrop-blur-xl bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-2xl border border-white/20 transition-all duration-300 flex items-center gap-2 hover:scale-105">
              <UserPlus size={20} />
              Tambah User
            </button>
            <button className="backdrop-blur-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-6 py-3 rounded-2xl border border-emerald-500/30 transition-all duration-300 flex items-center gap-2 hover:scale-105">
              <Download size={20} />
              Export Data
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-6 mb-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari nama atau email user..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
            />
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Filter
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50"
                size={16}
              />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3 pl-10 pr-8 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 appearance-none cursor-pointer"
              >
                <option value="all" className="bg-gray-800">
                  Semua Status
                </option>
                <option value="active" className="bg-gray-800">
                  Aktif
                </option>
                <option value="inactive" className="bg-gray-800">
                  Tidak Aktif
                </option>
                <option value="suspended" className="bg-gray-800">
                  Suspended
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl border border-white/20 p-6 shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Total User</p>
              <p className="text-3xl font-bold text-white">1,234</p>
            </div>
            <div className="text-4xl">👥</div>
          </div>
        </div>
        <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl border border-white/20 p-6 shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">User Aktif</p>
              <p className="text-3xl font-bold text-white">1,089</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>
        <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl border border-white/20 p-6 shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">
                User Baru (Bulan Ini)
              </p>
              <p className="text-3xl font-bold text-white">89</p>
            </div>
            <div className="text-4xl">🎉</div>
          </div>
        </div>
        <div className="backdrop-blur-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-3xl border border-white/20 p-6 shadow-2xl hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/70 text-sm mb-1">Total Booking</p>
              <p className="text-3xl font-bold text-white">5,672</p>
            </div>
            <div className="text-4xl">📅</div>
          </div>
        </div>
      </div>

      {/* User Table */}
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-6 text-white font-semibold">User</th>
                <th className="text-left p-6 text-white font-semibold hidden md:table-cell">
                  Kontak
                </th>
                <th className="text-left p-6 text-white font-semibold hidden lg:table-cell">
                  Lokasi
                </th>
                <th className="text-left p-6 text-white font-semibold hidden sm:table-cell">
                  Booking
                </th>
                <th className="text-left p-6 text-white font-semibold">
                  Status
                </th>
                <th className="text-left p-6 text-white font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-xl bg-white/10 border border-white/20">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{user.name}</p>
                        <p className="text-white/60 text-sm">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 hidden md:table-cell">
                    <div className="text-white/80">
                      <p className="flex items-center gap-2 mb-1">
                        <Phone size={14} />
                        {user.phone}
                      </p>
                      <p className="flex items-center gap-2 text-sm text-white/60">
                        <Calendar size={14} />
                        {new Date(user.joinDate).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </td>
                  <td className="p-6 hidden lg:table-cell">
                    <p className="text-white/80 flex items-center gap-2">
                      <MapPin size={14} />
                      {user.location}
                    </p>
                  </td>
                  <td className="p-6 hidden sm:table-cell">
                    <p className="text-white font-semibold">
                      {user.totalBookings}
                    </p>
                    <p className="text-white/60 text-sm">total booking</p>
                  </td>
                  <td className="p-6">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        user.status
                      )}`}
                    >
                      {user.status === "active"
                        ? "Aktif"
                        : user.status === "inactive"
                        ? "Tidak Aktif"
                        : "Suspended"}
                    </span>
                  </td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <button
                        className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Eye
                          size={16}
                          className="text-white/70 hover:text-white"
                        />
                      </button>
                      <button
                        className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Edit
                          size={16}
                          className="text-white/70 hover:text-white"
                        />
                      </button>
                      <button
                        className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <Trash2
                          size={16}
                          className="text-red-400 hover:text-red-300"
                        />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Detail Modal */}
      {showModal && selectedUser && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 max-w-2xl w-full p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Detail User</h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
              >
                <span className="text-white text-xl">×</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-xl bg-white/10 border border-white/20">
                    {selectedUser.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {selectedUser.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                        selectedUser.status
                      )}`}
                    >
                      {selectedUser.status === "active"
                        ? "Aktif"
                        : selectedUser.status === "inactive"
                        ? "Tidak Aktif"
                        : "Suspended"}
                    </span>
                  </div>
                </div>

                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-white/60 text-sm mb-1">Email</p>
                  <p className="text-white flex items-center gap-2">
                    <Mail size={16} />
                    {selectedUser.email}
                  </p>
                </div>

                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-white/60 text-sm mb-1">Telepon</p>
                  <p className="text-white flex items-center gap-2">
                    <Phone size={16} />
                    {selectedUser.phone}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-white/60 text-sm mb-1">Lokasi</p>
                  <p className="text-white flex items-center gap-2">
                    <MapPin size={16} />
                    {selectedUser.location}
                  </p>
                </div>

                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-white/60 text-sm mb-1">Bergabung</p>
                  <p className="text-white flex items-center gap-2">
                    <Calendar size={16} />
                    {new Date(selectedUser.joinDate).toLocaleDateString(
                      "id-ID"
                    )}
                  </p>
                </div>

                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-white/60 text-sm mb-1">Total Booking</p>
                  <p className="text-white text-2xl font-bold">
                    {selectedUser.totalBookings}
                  </p>
                </div>

                <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
                  <p className="text-white/60 text-sm mb-1">Login Terakhir</p>
                  <p className="text-white">
                    {new Date(selectedUser.lastLogin).toLocaleDateString(
                      "id-ID"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 py-3 rounded-2xl border border-blue-500/30 transition-all duration-300 font-semibold">
                Edit User
              </button>
              <button className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-300 py-3 rounded-2xl border border-red-500/30 transition-all duration-300 font-semibold">
                Suspend User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDataPage;
