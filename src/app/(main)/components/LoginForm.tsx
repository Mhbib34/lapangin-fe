import SocialLogin from "./SocialLogin";
import FormFields from "./FormFields";

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
  return (
    <form
      className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl"
      onSubmit={handleSubmit}
    >
      {/* Toggle Buttons */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-black/30 backdrop-blur-sm rounded-full p-1 border border-white/10">
          <button
            type="button"
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 bg-white/20 text-white shadow-lg`}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 text-white/70 hover:text-white`}
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
      <div className="flex items-center justify-between mt-6 text-sm">
        <label className="flex items-center text-white/70">
          <input type="checkbox" className="mr-2 rounded" />
          Remember me
        </label>
        <button className="text-white/70 hover:text-white transition-colors cursor-pointer">
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full mt-8 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] cursor-pointer"
      >
        Sign In
      </button>

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
