import {
  BarChart3,
  Calendar,
  ChevronDown,
  CreditCard,
  Home,
  MapPin,
  Settings,
  Users,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

type SideBarProps = {
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
};

interface SidebarItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
}

const SideBar = ({ sidebarCollapsed, setSidebarCollapsed }: SideBarProps) => {
  const pathName = usePathname();
  const router = useRouter();
  const sidebarItems: SidebarItem[] = [
    {
      path: "/admin/dashboard",
      label: "Dashboard",
      icon: <Home size={20} />,
      active: pathName === "/admin/dashboard",
    },
    {
      path: "/admin/bookings",
      label: "Booking",
      icon: <Calendar size={20} />,
      active: pathName === "/admin/bookings",
    },
    {
      path: "/admin/lapangan",
      label: "Lapangan",
      icon: <MapPin size={20} />,
      active: pathName === "/admin/lapangan",
    },
    {
      path: "/admin/users",
      label: "Pengguna",
      icon: <Users size={20} />,
      active: pathName === "/admin/users",
    },
    {
      path: "/admin/payments",
      label: "Pembayaran",
      icon: <CreditCard size={20} />,
      active: pathName === "/admin/payments",
    },
    {
      path: "/admin/reports",
      label: "Laporan",
      icon: <BarChart3 size={20} />,
      active: pathName === "/admin/reports",
    },
    {
      path: "/admin/settings",
      label: "Pengaturan",
      icon: <Settings size={20} />,
      active: pathName === "/admin/settings",
    },
  ];

  return (
    <div
      className={`${
        sidebarCollapsed ? "md:w-24 hidden md:block" : "w-64"
      } transition-all duration-300 ease-in-out`}
    >
      <div className="fixed top-0 left-0 h-full bg-white/10 backdrop-blur-lg border-r border-white/20 shadow-2xl z-30">
        <div
          className={`${
            sidebarCollapsed ? "w-24" : "w-64"
          } transition-all duration-300`}
        >
          {/* Logo */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                <MapPin size={20} className="text-white" />
              </div>
              {!sidebarCollapsed && (
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                    Lapangin
                  </h1>
                  <p className="text-xs text-white/60">Admin Panel</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-2">
            {sidebarItems.map((item, index) => (
              <button
                key={index}
                onClick={() => router.push(item.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                  item.active
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-white/20 shadow-lg"
                    : "hover:bg-white/10 hover:shadow-md"
                }`}
              >
                <span
                  className={`${
                    item.active
                      ? "text-blue-300"
                      : "text-white/70 group-hover:text-white"
                  } transition-colors`}
                >
                  {item.icon}
                </span>
                {!sidebarCollapsed && (
                  <span
                    className={`font-medium ${
                      item.active
                        ? "text-white"
                        : "text-white/80 group-hover:text-white"
                    } transition-colors`}
                  >
                    {item.label}
                  </span>
                )}
              </button>
            ))}
          </nav>

          {/* Collapse Button */}
          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="w-full flex items-center justify-center p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all duration-200"
            >
              <ChevronDown
                size={16}
                className={`transform transition-transform ${
                  sidebarCollapsed ? "-rotate-90" : "rotate-90"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
