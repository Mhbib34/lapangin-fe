"use client";
import { useState } from "react";
import LoginForm from "../../components/LoginForm";
import axiosInstance from "@/lib/axiosInstance";
import { AxiosError } from "axios";

const LoginPage = () => {
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
      const response = await axiosInstance.post("/api/users/login", formLogin);
      console.log(response);
    } catch (error) {
      const err = error as AxiosError<{ errors: string }>;
      const errorMessage =
        err.response?.data?.errors || "Login failed. Please try again.";
      console.log(errorMessage);
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
