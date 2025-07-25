"use client";
import StatsCard from "../components/StatsCard";
import RecentBookings from "../components/RecentBookings";

const AdminDashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <StatsCard />

      {/* Main Content Grid */}
      <RecentBookings />
    </div>
  );
};

export default AdminDashboard;
