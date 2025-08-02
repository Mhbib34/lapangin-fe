"use client";

import React from "react";
import {
  X,
  Mail,
  User2,
  Calendar,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { User } from "@/type/user";
import { Format } from "@/utils/format";
import { showConfirm, showSuccess } from "@/lib/sonnerToast";
import { isErrorResponse } from "@/utils/error-response";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

interface UserInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  handleLogout: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({
  isOpen,
  onClose,
  user,
  handleLogout,
}) => {
  const router = useRouter();
  if (!isOpen || !user) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const res = await axiosInstance.post("/api/users/verify-otp", {
        withCredentials: true,
      });
      showSuccess(res.data.message);
      router.push("/verify-email");
    } catch (error) {
      isErrorResponse(error, "Verify Email Failed. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md mx-auto">
        {/* Modal Container dengan Glassmorphism */}
        <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header dengan Gradient */}
          <div className="relative bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-white/20 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white bg-gradient-to-r from-white to-cyan-200 bg-clip-text">
                Informasi Pengguna
              </h2>
              <button
                onClick={onClose}
                className="text-white/70 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <User2 className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-1">
                {user.name || "Nama tidak tersedia"}
              </h3>
              <p className="text-cyan-200/80 text-sm">{user.role || "User"}</p>
            </div>

            {/* Email Verification Status */}
            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  {user.isAccountVerified ? (
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-yellow-400" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="w-4 h-4 text-white/70" />
                    <span className="text-white font-medium">Email</span>
                  </div>
                  <p className="text-white/80 text-sm mb-2">
                    {user.email || "Email tidak tersedia"}
                  </p>
                  {user.isAccountVerified ? (
                    <div className="flex items-center space-x-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-400/20 text-green-300 border border-green-400/30">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Terverifikasi
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Belum Verifikasi
                      </span>
                      <button
                        onClick={handleVerifyEmail}
                        className="block w-full text-left text-xs text-cyan-300 hover:text-cyan-200 underline transition-colors cursor-pointer"
                      >
                        Verifikasi Email
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              {/* Account Created */}
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white/70" />
                </div>
                <div>
                  <p className="text-white/70 text-xs">Bergabung Sejak</p>
                  <p className="text-white text-sm font-medium">
                    {Format.formatDate(user.createdAt)}
                  </p>
                </div>
              </div>

              {/* User ID */}
              {user.id && (
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                    <User2 className="w-4 h-4 text-white/70" />
                  </div>
                  <div>
                    <p className="text-white/70 text-xs">ID Pengguna</p>
                    <p className="text-white text-sm font-medium font-mono">
                      {user.id.substring(0, 8)}...
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() =>
                  showConfirm(
                    "Keluar?",
                    "Anda yakin ingin keluar?",
                    handleLogout,
                    "Keluar"
                  )
                }
                className="w-full py-3 px-4 bg-gradient-to-r from-red-500/70 to-red-500/50 hover:from-red-500/30 hover:to-red-500/30 border border-red-500/30 text-white font-medium rounded-xl transition-all duration-200 backdrop-blur-sm cursor-pointer"
              >
                Keluar
              </button>
              <button
                onClick={onClose}
                className="w-full py-3 px-4 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 text-white font-medium rounded-xl transition-all duration-200 backdrop-blur-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
