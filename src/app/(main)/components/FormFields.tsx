import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import React from "react";
type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  formLogin: { email: string; password: string };
};
const FormFields = ({
  formLogin,
  handleInputChange,
  showPassword,
  setShowPassword,
}: Props) => {
  return (
    <div className="space-y-6">
      <div className="relative">
        <input
          type="email"
          name="email"
          value={formLogin.email}
          onChange={handleInputChange}
          placeholder="email@example.com"
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
        />
        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={formLogin.password}
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
  );
};

export default FormFields;
