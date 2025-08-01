"use client";
import TopBar from "@/app/components/TopBar";
import UsersSidebar from "@/app/components/UsersSidebar";
import { useState } from "react";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      <UsersSidebar
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        setSidebarOpen={setSidebarOpen}
        sidebarOpen={sidebarOpen}
      />
      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:ml-24" : "lg:ml-80"
        }`}
      >
        <TopBar setSidebarOpen={setSidebarOpen} />
        <div className="p-4 lg:p-6">{children}</div>
      </div>
    </div>
  );
}
