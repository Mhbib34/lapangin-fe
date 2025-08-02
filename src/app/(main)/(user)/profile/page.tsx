"use client";

import React, { useState } from "react";
import {
  User2,
  Mail,
  Phone,
  Save,
  Edit3,
  Shield,
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
} from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";
import { Format } from "@/utils/format";
import { User } from "@/type/user";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonnerToast";
import { isErrorResponse } from "@/utils/error-response";
import { useRouter } from "next/navigation";

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const { user, fetchUser } = useAuthStore(
    useShallow((s) => ({
      user: s.user,
      fetchUser: s.fetchUser,
    }))
  );

  const [formData, setFormData] = useState<Partial<User>>({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    username: user?.username || "",
  });

  // State untuk password change
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.patch("/api/users", formData, {
        withCredentials: true,
      });
      console.log(res.data.message);
      showSuccess(res.data.message);
      fetchUser();
      setIsEditing(false);
    } catch (error) {
      isErrorResponse(error, "Update profile failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    try {
      const res = await axiosInstance.patch(
        "/api/users/password",
        passwordData,
        {
          withCredentials: true,
        }
      );
      console.log(res.data.message);
      showSuccess(res.data.message);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowPasswordForm(false);
      router.push("/login");
    } catch (error) {
      isErrorResponse(error, "Update password failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-white to-cyan-200 bg-clip-text">
              Profil Pengguna
            </h1>
            <p className="text-cyan-200/60 mt-2">
              Kelola informasi pribadi dan pengaturan akun Anda
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 hover:from-cyan-500/30 hover:to-blue-500/30 border border-cyan-500/30 text-white rounded-xl transition-all duration-200"
          >
            <Edit3 className="w-4 h-4" />
            <span>{isEditing ? "Batal" : "Edit Profil"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Avatar Section */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 text-center">
            <div className="relative inline-block">
              <div className="relative w-32 h-32 mx-auto">
                <div className="w-full h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                  <User2 className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>

            <h2 className="text-xl font-bold text-white mt-4">
              {user?.name || "Nama Pengguna"}
            </h2>
            <p className="text-cyan-200/80 text-sm">{user?.role || "Member"}</p>

            {/* Verification Badges */}
            <div className="flex flex-col space-y-2 mt-4">
              <div className="flex items-center justify-center space-x-2">
                {user?.isAccountVerified ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-400/20 text-green-300 border border-green-400/30">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    Email Terverifikasi
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-400/20 text-yellow-300 border border-yellow-400/30">
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Email Belum Verifikasi
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Account Info */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-cyan-400" />
              Informasi Akun
            </h3>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Bergabung</span>
                <span className="text-white text-sm">
                  {Format.formatDate(user?.createdAt || "")}
                </span>
              </div>

              {/* {user?.lastLogin && (
                  <div className="flex items-center justify-between">
                    <span className="text-white/70 text-sm">
                      Login Terakhir
                    </span>
                    <span className="text-white text-sm">
                      {formatDate(user.lastLogin)}
                    </span>
                  </div>
                )} */}

              <div className="flex items-center justify-between">
                <span className="text-white/70 text-sm">Status</span>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-400/20 text-green-300">
                  Aktif
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <User2 className="w-5 h-5 mr-2 text-cyan-400" />
              Informasi Pribadi
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                  placeholder="Masukkan nama lengkap"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 pr-10 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                    placeholder="email@example.com"
                  />
                  <Mail className="absolute right-3 top-3.5 w-4 h-4 text-white/50" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-white/70 text-sm font-medium mb-2">
                  Nomor Telepon
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full px-4 py-3 pr-10 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm"
                    placeholder="+62 xxx xxxx xxxx"
                  />
                  <Phone className="absolute right-3 top-3.5 w-4 h-4 text-white/50" />
                </div>
              </div>
            </div>

            {/* Save Button */}
            {isEditing && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  <span>{isLoading ? "Menyimpan..." : "Simpan Perubahan"}</span>
                </button>
              </div>
            )}
          </div>

          {/* Security Section */}
          <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-cyan-400" />
              Keamanan
            </h3>

            {!showPasswordForm ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Password</p>
                  <p className="text-white/70 text-sm">
                    Terakhir diubah 30 hari yang lalu
                  </p>
                </div>
                <button
                  onClick={() => setShowPasswordForm(true)}
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg transition-all duration-200"
                >
                  Ubah Password
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Current Password */}
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Password Saat Ini
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-10 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                      placeholder="Masukkan password saat ini"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                      className="absolute right-3 top-3.5 text-white/50 hover:text-white transition-colors"
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-10 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                      placeholder="Masukkan password baru"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-3.5 text-white/50 hover:text-white transition-colors"
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-white/70 text-sm font-medium mb-2">
                    Konfirmasi Password Baru
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      className="w-full px-4 py-3 pr-10 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                      placeholder="Konfirmasi password baru"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-3.5 text-white/50 hover:text-white transition-colors"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-4">
                  <button
                    onClick={handleChangePassword}
                    disabled={
                      isLoading ||
                      !passwordData.currentPassword ||
                      !passwordData.newPassword ||
                      !passwordData.confirmPassword
                    }
                    className="flex-1 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-medium rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Mengubah..." : "Ubah Password"}
                  </button>
                  <button
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordData({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-all duration-200"
                  >
                    Batal
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
