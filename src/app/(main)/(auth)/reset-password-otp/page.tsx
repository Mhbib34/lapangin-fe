"use client";

import { useState } from "react";
import AuthForm from "../../components/AuthForm";
import { Mail } from "lucide-react";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonnerToast";
import { useRouter } from "next/navigation";
import { isErrorResponse } from "@/utils/error-response";

const SendResetPasswordOtp = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/users/reset-otp", { email });
      console.log(res.data.message);
      showSuccess(res.data.message);
      router.push("/reset-password");
    } catch (error) {
      isErrorResponse(
        error,
        "Send reset password otp failed. Please try again."
      );
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
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
        />
        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
      </div>
    </AuthForm>
  );
};

export default SendResetPasswordOtp;
