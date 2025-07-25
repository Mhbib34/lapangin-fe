import { Bell, ChevronDown, ChevronUp, Search, User } from "lucide-react";
import { useState } from "react";
import ModalProfile from "./ModalProfile";

type Props = {
  user: {
    name: string;
    email: string;
    isAccountVerified: boolean;
  };
  logout: () => void;
};

const TopBar = ({ user, logout }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="sticky top-0 z-20 bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-lg">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
            Dashboard
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center">
              3
            </span>
          </button>

          {/* Profile */}
          <div
            onClick={() => setIsModalOpen(!isModalOpen)}
            className="flex items-center space-x-3 p-2 rounded-xl bg-white/10 hover:bg-white/20 cursor-pointer transition-all relative"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User size={16} />
            </div>
            <div className="hidden md:block">
              <p className="font-medium">{user?.name}</p>
              <p className="text-xs text-white/60">{user?.email}</p>
            </div>
            {/* Dropdown */}
            {isModalOpen ? (
              <ChevronUp size={16} className="text-white/60" />
            ) : (
              <ChevronDown size={16} className="text-white/60" />
            )}
            {/* Modal Profile */}
            {isModalOpen && <ModalProfile user={user} logout={logout} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
