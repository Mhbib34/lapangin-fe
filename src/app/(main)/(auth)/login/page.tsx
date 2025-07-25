"use client";
import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonnerToast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { isErrorResponse } from "@/utils/error-response";

const LoginPage = () => {
  const refetchUser = useAuthStore((state) => state.fetchUser);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormLogin({ ...formLogin, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/users/login", formLogin);
      showSuccess(res.data.message);
      refetchUser();
      if (res.data.data.role === "ADMIN") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    } catch (error) {
      isErrorResponse(error, "Login failed. Please try again.");
    }
  };

  return (
    <LoginForm
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formLogin={formLogin}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default LoginPage;
