"use client";
import { Eye, EyeOff, Lock, Mail, User2 } from "lucide-react";
import React from "react";
import SocialLogin from "./SocialLogin";
import SubmitButton from "./SubmitButton";
import Link from "next/link";

type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  formRegister: {
    email: string;
    password: string;
    username: string;
    name: string;
  };
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const RegisterForm = ({
  showPassword,
  setShowPassword,
  handleInputChange,
  formRegister,
  handleSubmit,
}: Props) => {
  return (
    <form
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
      onSubmit={handleSubmit}
    >
      {/* Toggle Buttons */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-full px-1 py-2 border border-white/10">
          <Link
            href="/login"
            type="button"
            className={`px-6 py-2 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 text-white/70 hover:text-white`}
          >
            Sign In
          </Link>
          <Link
            href="/register"
            type="button"
            className={`px-6 py-2 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 bg-white/20 text-white shadow-lg`}
          >
            Sign Up
          </Link>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-white/70">Please fill in your information</p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        <div className="relative">
          <input
            type="text"
            name="name"
            value={formRegister.name}
            onChange={handleInputChange}
            placeholder="Full Name"
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
            <div className="w-4 h-4 rounded-full bg-white/30"></div>
          </div>
        </div>
        <div className="relative">
          <input
            type="email"
            name="email"
            value={formRegister.email}
            onChange={handleInputChange}
            placeholder="email@example.com"
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
          />
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        </div>

        <div className="relative">
          <input
            type="text"
            name="username"
            value={formRegister.username}
            onChange={handleInputChange}
            placeholder="Username"
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
          />
          <User2 className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formRegister.password}
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
      </div>

      {/* Submit Button */}
      <SubmitButton text="Sign Up" />

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-white/20"></div>
        <span className="px-4 text-white/50 text-sm">or</span>
        <div className="flex-1 border-t border-white/20"></div>
      </div>

      {/* Social Login */}
      <SocialLogin />
    </form>
  );
};

export default RegisterForm;
