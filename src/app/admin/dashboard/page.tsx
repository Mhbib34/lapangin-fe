"use client";
import React, { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import SideBar from "../components/SideBar";
import TopBar from "../components/TopBar";
import { useRouter } from "next/navigation";
import { useShallow } from "zustand/shallow";
import PremiumGlassLoader from "@/components/LoadingAnimations";
import StatsCard from "../components/StatsCard";
import RecentBookings from "../components/RecentBookings";

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white scrollbar-none ">
      <div className="relative flex">
        {/* Sidebar */}
        <SideBar
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
        />
        {/* Main Content */}
        <div className="flex-1 min-h-screen">
          {/* Top Bar */}
          <TopBar user={user!} logout={handleLogout} />
          {/* Dashboard Content */}
          <div className="p-6 space-y-6">
            {/* Stats Cards */}
            <StatsCard />

            {/* Main Content Grid */}
            <RecentBookings />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
