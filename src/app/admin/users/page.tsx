"use client";
import React, { useState, useEffect } from "react";
import { RefreshCcwDot, UserSearchIcon } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";
import PremiumGlassLoader from "@/components/LoadingAnimations";
import { User } from "@/type/user";
import { isErrorResponse } from "@/utils/error-response";
import { showSuccess } from "@/lib/sonnerToast";
import Pagination from "../components/Pagination";
import UserDetailModal from "./components/UserDetailModal";
import UserTable from "./components/UserTable";
import UserStatsCard from "./components/UserStatsCard";
import UserSearch from "./components/UserSearch";

const UserDataPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { users, loading, listUsers } = useAuthStore(
    useShallow((s) => ({
      users: s.users,
      loading: s.loading,
      listUsers: s.listUsers,
    }))
  );

  useEffect(() => {
    listUsers(currentPage);
    //eslint-disable-next-line
  }, [currentPage]);

  if (loading) {
    return <PremiumGlassLoader />;
  }

  const filteredUsers = users.data.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const newUsersThisMonth = users.data.filter(
    (user) => new Date(user.createdAt).getMonth() === new Date().getMonth()
  );

  const handleRefreshUsers = () => {
    try {
      listUsers(1);
      showSuccess("Berhasil refresh users");
    } catch (error) {
      isErrorResponse(error, "Refresh users failed. Please try again.");
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              Data User Lapangin
            </h1>
            <p className="text-white/70 text-lg">
              Kelola data pengguna aplikasi booking lapangan olahraga
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleRefreshUsers}
              className="backdrop-blur-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 px-6 py-3 rounded-2xl border border-emerald-500/30 transition-all duration-300 flex items-center gap-2 hover:scale-105 cursor-pointer"
            >
              <RefreshCcwDot size={20} />
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Stats Cards */}
      {filteredUsers.length > 0 && (
        <>
          <UserStatsCard users={users} newUsersThisMonth={newUsersThisMonth} />
          <UserTable
            filteredUsers={filteredUsers}
            handleUserClick={handleUserClick}
          />
        </>
      )}
      {/* User Table */}

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 inline-block">
            <UserSearchIcon className="mx-auto text-white/60 mb-4" size={48} />
            <h3 className="text-xl font-semibold text-white mb-2">
              Tidak ada pengguna yang cocok
            </h3>
            <p className="text-blue-100/80">
              Coba ubah kata kunci pencarian atau filter Anda
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {users.paging.total_page > 1 && filteredUsers.length > 0 && (
        <Pagination
          currentPage={users.paging.current_page}
          totalPages={users.paging.total_page}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
      {/* User Detail Modal */}
      {showModal && selectedUser && (
        <UserDetailModal
          setShowModal={setShowModal}
          selectedUser={selectedUser}
        />
      )}
    </div>
  );
};

export default UserDataPage;
