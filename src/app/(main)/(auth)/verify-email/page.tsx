"use client";
import React, { useRef, useState } from "react";
import AuthForm from "../../components/AuthForm";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonnerToast";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";
import PremiumGlassLoader from "@/components/LoadingAnimations";
import { useRouter } from "next/navigation";
import { isErrorResponse } from "@/utils/error-response";

const OTP_LENGTH = 6;

const VerifyEmailPage = () => {
  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { fetchUser, loading } = useAuthStore(
    useShallow((s) => ({ fetchUser: s.fetchUser, loading: s.loading }))
  );
  const router = useRouter();
  const handleInput = (e: React.FormEvent<HTMLInputElement>, index: number) => {
    const value = e.currentTarget.value;
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("Text").trim();
    if (!/^\d+$/.test(pasteData)) return;

    const digits = pasteData.slice(0, OTP_LENGTH).split("");
    setOtp((prevOtp) => {
      const updatedOtp = [...prevOtp];
      digits.forEach((digit, i) => {
        updatedOtp[i] = digit;
      });
      return updatedOtp;
    });

    // Fokus ke input setelah digit terakhir
    const nextIndex = Math.min(digits.length, OTP_LENGTH - 1);
    inputRefs.current[nextIndex]?.focus();
  };

  if (loading) return <PremiumGlassLoader />;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.patch("/api/users/verify-email", {
        otp: parseInt(otp.join(""), 10),
      });
      console.log(res.data.message);
      showSuccess(res.data.message);
      router.back();
      fetchUser();
    } catch (error) {
      isErrorResponse(error, "Verify Emaed. Please try again.");
    }
  };

  return (
    <AuthForm
      title="Verify Email"
      titleText="Enter your OTP"
      handleSubmit={handleSubmit}
    >
      <div className="flex gap-2 justify-center">
        {Array.from({ length: OTP_LENGTH }).map((_, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            required
            className="md:w-12 md:h-12 w-10 h-10 bg-white border-2 border-black text-black text-center text-xl rounded-md focus:outline-none focus:ring"
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            value={otp[index]}
            onInput={(e) => handleInput(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={index === 0 ? handlePaste : undefined}
          />
        ))}
      </div>
    </AuthForm>
  );
};

export default VerifyEmailPage;
