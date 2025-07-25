"use client";
import React, { useState } from "react";
import AuthForm from "../../components/AuthForm";
import { Eye, EyeOff, KeyIcon, Lock, Mail } from "lucide-react";
import { showSuccess } from "@/lib/sonnerToast";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { isErrorResponse } from "@/utils/error-response";

const ResetPasswordPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState({
    otp: "",
    email: "",
    newPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setResetPassword({ ...resetPassword, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.patch("/api/users/reset-password", {
        otp: parseInt(resetPassword.otp),
        email: resetPassword.email,
        newPassword: resetPassword.newPassword,
      });

      console.log(res.data.message);
      showSuccess(res.data.message);
      router.push("/login");
    } catch (error) {
      isErrorResponse(error, "Reset Password Failed. Please try again.");
    }
  };

  return (
    <AuthForm
      title="Reset Password"
      titleText="Enter your email"
      handleSubmit={handleSubmit}
    >
      <div className="relative">
        <input
          type="text"
          name="otp"
          value={resetPassword.otp}
          onChange={handleInputChange}
          placeholder="Enter your otp"
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
        />
        <KeyIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
      </div>
      <div className="relative">
        <input
          type="email"
          name="email"
          value={resetPassword.email}
          onChange={handleInputChange}
          placeholder="email@example.com"
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
        />
        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
      </div>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="newPassword"
          value={resetPassword.newPassword}
          onChange={handleInputChange}
          placeholder="Enter your password"
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 pr-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
        />
        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white transition-colors"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
    </AuthForm>
  );
};

export default ResetPasswordPage;
