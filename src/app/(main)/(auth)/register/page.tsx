"use client";
import React, { useState } from "react";
import RegisterForm from "../../components/RegisterForm";
import { showError, showSuccess } from "@/lib/sonnerToast";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";

const RegisterPage = () => {
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
    } catch (error) {
      const err = error as AxiosError<{ errors: string }>;
      const errorMessage =
        err.response?.data?.errors || "Register failed. Please try again.";
      showError(errorMessage);
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
