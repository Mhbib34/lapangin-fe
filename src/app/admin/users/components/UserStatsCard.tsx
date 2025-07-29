import { User, UserPage } from "@/type/user";
import React from "react";

type Props = {
  users: UserPage;
  newUsersThisMonth: User[];
};
const UserStatsCard = ({ users, newUsersThisMonth }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="backdrop-blur-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl border border-white/20 p-6 shadow-2xl hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm mb-1">Total User</p>
            <p className="text-3xl font-bold text-white">{users.data.length}</p>
          </div>
          <div className="text-4xl">👥</div>
        </div>
      </div>
      <div className="backdrop-blur-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-3xl border border-white/20 p-6 shadow-2xl hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm mb-1">User Aktif</p>
            <p className="text-3xl font-bold text-white">{users.data.length}</p>
          </div>
          <div className="text-4xl">✅</div>
        </div>
      </div>
      <div className="backdrop-blur-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-3xl border border-white/20 p-6 shadow-2xl hover:scale-105 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/70 text-sm mb-1">User Baru (Bulan Ini)</p>
            <p className="text-3xl font-bold text-white">
              {newUsersThisMonth.length}
            </p>
          </div>
          <div className="text-4xl">🎉</div>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;
