"use client";
import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";
import { showError, showSuccess } from "@/lib/sonnerToast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

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
      const err = error as AxiosError<{ errors: string }>;
      const errorMessage =
        err.response?.data?.errors || "Login failed. Please try again.";
      showError(errorMessage);
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
