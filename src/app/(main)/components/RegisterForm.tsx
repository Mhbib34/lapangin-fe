import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React from "react";

type Props = {
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

const RegisterForm = ({
  isLogin,
  setIsLogin,
  showPassword,
  setShowPassword,
}: Props) => {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
      {/* Toggle Buttons */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-full p-1 border border-white/10">
          <button
            type="button"
            onClick={() => setIsLogin(true)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              isLogin
                ? "bg-white/20 text-white shadow-lg"
                : "text-white/70 hover:text-white"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsLogin(false)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              !isLogin
                ? "bg-white/20 text-white shadow-lg"
                : "text-white/70 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          {isLogin ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="text-white/70">
          {isLogin
            ? "Please sign in to your account"
            : "Please fill in your information"}
        </p>
      </div>

      {/* Form Fields */}
      <div className="space-y-6">
        {!isLogin && (
          <div className="relative">
            <input
              type="text"
              name="fullName"
              //   value={formData.fullName}
              //   onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
            />
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
              <div className="w-4 h-4 rounded-full bg-white/30"></div>
            </div>
          </div>
        )}

        <div className="relative">
          <input
            type="email"
            name="email"
            // value={formData.email}
            // onChange={handleInputChange}
            placeholder="email@example.com"
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
          />
          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            // value={formData.password}
            // onChange={handleInputChange}
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

        {!isLogin && (
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              //   value={formData.confirmPassword}
              //   onChange={handleInputChange}
              placeholder="Confirm password"
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
            />
            <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          </div>
        )}
      </div>

      {/* Remember & Forgot */}
      {isLogin && (
        <div className="flex items-center justify-between mt-6 text-sm">
          <label className="flex items-center text-white/70">
            <input type="checkbox" className="mr-2 rounded" />
            Remember me
          </label>
          <button className="text-white/70 hover:text-white transition-colors">
            Forgot password?
          </button>
        </div>
      )}

      {/* Submit Button */}
      <button
        // onClick={handleSubmit}
        className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
      >
        {isLogin ? "Sign In" : "Create Account"}
      </button>

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-white/20"></div>
        <span className="px-4 text-white/50 text-sm">or</span>
        <div className="flex-1 border-t border-white/20"></div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-2 gap-4">
        <button
          type="button"
          className="flex items-center justify-center py-3 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Google
        </button>
        <button
          type="button"
          className="flex items-center justify-center py-3 px-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white/70 hover:text-white hover:bg-white/20 transition-all duration-300"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
          </svg>
          Twitter
        </button>
      </div>
    </div>
  );
};

export default RegisterForm;
