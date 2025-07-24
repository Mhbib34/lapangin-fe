import SocialLogin from "./SocialLogin";
import FormFields from "./FormFields";
import { useRouter } from "next/navigation";
import SubmitButton from "./SubmitButton";

type Props = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  handleInputChange: React.ChangeEventHandler<HTMLInputElement>;
  formLogin: { email: string; password: string };
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
};

const LoginForm = ({
  showPassword,
  setShowPassword,
  handleInputChange,
  formLogin,
  handleSubmit,
}: Props) => {
  const router = useRouter();
  return (
    <form
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
      onSubmit={handleSubmit}
    >
      {/* Toggle Buttons */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-full p-1 border border-white/10">
          <button
            onClick={() => router.push("/login")}
            type="button"
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-white/20 text-white shadow-lg cursor-pointer`}
          >
            Sign In
          </button>
          <button
            onClick={() => router.push("/register")}
            type="button"
            className={`px-6 py-2 cursor-pointer rounded-full text-sm font-medium transition-all duration-300 text-white/70 hover:text-white`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
        <p className="text-white/70">Please sign in to your account</p>
      </div>

      {/* Form Fields */}
      <FormFields
        setShowPassword={setShowPassword}
        showPassword={showPassword}
        handleInputChange={handleInputChange}
        formLogin={formLogin}
      />

      {/* Remember & Forgot */}
      <div className="flex items-center justify-end mt-6 text-sm">
        <button
          type="button"
          onClick={() => router.push("/reset-password-otp")}
          className="text-white/70 hover:text-white transition-colors cursor-pointer"
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <SubmitButton text="Sign In" />

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

export default LoginForm;
