import { CheckCircle, MailWarning, LogOut } from "lucide-react";

type Props = {
  user: {
    isAccountVerified: boolean;
  };
  logout: () => void;
};

const ModalProfile = ({ user, logout }: Props) => {
  return (
    <div className="absolute top-15 right-0 w-60 rounded-xl p-4 bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl z-50 animate-fade-in">
      <div className="space-y-4">
        {!user.isAccountVerified ? (
          <div className="p-3 rounded-lg bg-red-500/15 border border-red-500/30">
            <div className="flex items-center gap-2 text-red-400 font-semibold">
              <MailWarning size={18} />
              <span>Not Verified</span>
            </div>
            <button className="mt-3 w-full cursor-pointer py-2 px-3 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">
              Verifikasi Email
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-green-400 font-semibold bg-green-500/10 border border-green-500/30 p-3 rounded-lg">
            <CheckCircle size={18} />
            <span>Email Terverifikasi</span>
          </div>
        )}

        <button
          type="button"
          onClick={logout}
          className="flex items-center justify-center w-full py-2 px-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition font-medium cursor-pointer"
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default ModalProfile;
