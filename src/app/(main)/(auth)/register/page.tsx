"use client";
import React, { useState } from "react";
import RegisterForm from "../../components/RegisterForm";
import { showSuccess } from "@/lib/sonnerToast";
import { isErrorResponse } from "@/utils/error-response";
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    name: "",
    username: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormRegister({ ...formRegister, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/api/users", formRegister);
      console.log(res.data.message);
      showSuccess(res.data.message);
      router.push("/login");
    } catch (error) {
      isErrorResponse(error, "Register failed. Please try again.");
    }
  };
  return (
    <RegisterForm
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      formRegister={formRegister}
      handleInputChange={handleInputChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegisterPage;
