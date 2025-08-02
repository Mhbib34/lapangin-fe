import { User } from "@/type/user";
import { AlarmClock, Menu } from "lucide-react";
import React, { useEffect, useState } from "react";
type Props = {
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  user: User | null;
};

const TopBar = ({ setSidebarOpen, user }: Props) => {
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <header className="relative z-10 p-4 lg:p-6">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-4 border border-white/20 shadow-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white/70 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-white">
                {user ? `Selamat Datang, ${user.name}!` : "Selamat Datang!"}
              </h1>
              <div>
                <p className="text-cyan-200/80 text-sm">
                  {currentTime &&
                    currentTime.toLocaleDateString("id-ID", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right hidden sm:flex items-center gap-4">
              <div className="text-white/90 font-mono text-lg">
                {currentTime &&
                  currentTime.toLocaleTimeString("id-ID", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
              </div>
              <AlarmClock className="w-6 h-6 text-cyan-200/80" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
