"use client";
import { useState } from "react";
import SideBar from "./components/SideBar";
import TopBar from "./components/TopBar";
import { showConfirm } from "@/lib/sonnerToast";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { useShallow } from "zustand/shallow";
import PremiumGlassLoader from "@/components/LoadingAnimations";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();
  const { logout, user, loading } = useAuthStore(
    useShallow((s) => ({ logout: s.logout, user: s.user, loading: s.loading }))
  );

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  if (loading) {
    return <PremiumGlassLoader />;
  }
  if (user?.role !== "ADMIN") {
    router.push("/");
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white scrollbar-none">
      <div className="relative flex">
        <SideBar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        <div className="min-h-screen flex-1">
          <TopBar
            sidebarCollapsed={sidebarCollapsed}
            setSidebarCollapsed={setSidebarCollapsed}
            user={user!}
            logout={() =>
              showConfirm(
                "Logout",
                "Are you sure want to logout?",
                handleLogout,
                "Logout"
              )
            }
          />
          {children}
        </div>
      </div>
    </div>
  );
}
