"use client";
import { showConfirm } from "@/lib/sonnerToast";
import { useAuthStore } from "@/store/auth-store";
import { useBookingStore } from "@/store/booking-store";
import { BookOpen, History, Home, Menu, Settings, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";

type Props = {
  sidebarOpen: boolean;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const UsersSidebar = ({
  sidebarOpen,
  sidebarCollapsed,
  setSidebarCollapsed,
  setSidebarOpen,
}: Props) => {
  const router = useRouter();
  const { user, logout } = useAuthStore(
    useShallow((s) => ({
      logout: s.logout,
      user: s.user,
    }))
  );
  const { bookingsByUser } = useBookingStore(
    useShallow((s) => ({
      bookingsByUser: s.bookingsByUser,
    }))
  );

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };
  const path = usePathname();
  const sidebarItems = [
    {
      id: "home",
      icon: Home,
      label: "Beranda",
      count: null,
      path: "/",
      active: path === "/",
    },
    {
      id: "bookings",
      icon: BookOpen,
      label: "Booking Saya",
      count: bookingsByUser?.length,
      path: "/bookings",
      active: path === "/bookings",
    },
    {
      id: "history",
      icon: History,
      label: "Riwayat",
      count: null,
      path: "/history",
      active: path === "/history",
    },
    // {
    //   id: "favorites",
    //   icon: Heart,
    //   label: "Favorit",
    //   count: favoriteFields.length,
    // },
    // {
    //   id: "notifications",
    //   icon: Bell,
    //   label: "Notifikasi",
    //   count: unreadCount,
    // },
    {
      id: "profile",
      icon: User,
      label: "Profil",
      count: null,
      path: "/profile",
      active: path === "/profile",
    },
    {
      id: "settings",
      icon: Settings,
      label: "Pengaturan",
      count: null,
      path: "/settings",
      active: path === "/settings",
    },
  ];
  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 backdrop-blur-xl bg-black/20 border-r border-white/20 transform transition-all duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 ${sidebarCollapsed ? "lg:w-24" : "lg:w-80"} w-80`}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div>
                <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-white to-cyan-200 bg-clip-text">
                  Lapangin
                </h2>
                <p className="text-cyan-200/60 text-sm">Dashboard</p>
              </div>
            )}
            <div className="flex items-center space-x-2">
              {/* Desktop Collapse Button */}
              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:block text-white/70 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
                title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                <Menu
                  className={`w-5 h-5 transition-transform duration-300 ${
                    sidebarCollapsed ? "rotate-180" : ""
                  }`}
                />
              </button>
              {/* Mobile Close Button */}
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-white/70 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-6">
          <nav className="space-y-2">
            {sidebarItems.map((item) => (
              <div key={item.id} className="relative group">
                <Link
                  href={item.path}
                  className={`w-full flex items-center ${
                    sidebarCollapsed ? "justify-center" : "justify-between"
                  } p-3 rounded-xl transition-all duration-300 ${
                    item.active
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 text-white"
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                  title={sidebarCollapsed ? item.label : ""}
                >
                  <div
                    className={`flex items-center ${
                      sidebarCollapsed ? "" : "space-x-3"
                    }`}
                  >
                    <item.icon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && (
                      <span className="font-medium">{item.label}</span>
                    )}
                  </div>
                  {!sidebarCollapsed &&
                    item.count !== null &&
                    item.count! > 0 && (
                      <span className="px-2 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-xs font-semibold">
                        {item.count}
                      </span>
                    )}
                  {sidebarCollapsed &&
                    item.count !== null &&
                    item.count > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-500 text-white rounded-full text-xs flex items-center justify-center font-semibold">
                        {item.count > 9 ? "9+" : item.count}
                      </span>
                    )}
                </Link>

                {/* Tooltip for collapsed sidebar */}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-2 py-1 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    {item.count !== null && item.count > 0 && (
                      <span className="ml-2 px-1 py-0.5 bg-cyan-500 rounded text-xs">
                        {item.count}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>

        {/* User Profile Section */}
        <div className="p-6 border-t border-white/20">
          {sidebarCollapsed ? (
            <div className="text-center group relative">
              <div className="w-10 h-10 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              {/* Tooltip for collapsed profile */}
              <div className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white p-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                <div className="font-semibold">{user?.name}</div>
                <div className="font-semibold">{user?.email}</div>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="">
                <div className="font-semibold text-white">{user?.name}</div>
                <div className="font-light text-white text-sm">
                  {user?.email}
                </div>
              </div>
              <button
                onClick={() =>
                  showConfirm(
                    "Keluar?",
                    "Anda yakin ingin keluar?",
                    handleLogout,
                    "Keluar"
                  )
                }
                className="ml-auto py-1 px-2 bg-red-800 hover:bg-red-600 text-white rounded-lg transition font-medium cursor-pointer"
              >
                Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersSidebar;
