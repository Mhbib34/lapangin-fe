import { User } from "@/type/user";
import { Format } from "@/utils/format";
import { Eye, Mail, Phone, Users2 } from "lucide-react";
import React from "react";

type Props = {
  filteredUsers: User[];
  handleUserClick: (user: User) => void;
};

const UserTable = ({ filteredUsers, handleUserClick }: Props) => {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 overflow-hidden shadow-2xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left p-6 text-white font-semibold">User</th>
              <th className="text-left p-6 text-white font-semibold hidden md:table-cell">
                No HP
              </th>
              <th className="text-left p-6 text-white font-semibold hidden lg:table-cell">
                Email
              </th>
              <th className="text-left p-6 text-white font-semibold hidden lg:table-cell">
                Username
              </th>
              <th className="text-left p-6 text-white font-semibold hidden lg:table-cell">
                Tanggal Bergabung
              </th>
              <th className="text-left p-6 text-white font-semibold">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-white/5 hover:bg-white/5 transition-all duration-300 cursor-pointer"
              >
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl backdrop-blur-xl bg-white/10 border border-white/20">
                      {user.name
                        .split(" ")
                        .map((name) => name.charAt(0))
                        .join("")}
                    </div>
                    <div>
                      <p className="text-white font-semibold">{user.name}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 hidden md:table-cell">
                  <div className="text-white/80">
                    <p className="flex items-center gap-2 text-lg">
                      <Phone size={14} />
                      {user.phone || "-"}
                    </p>
                  </div>
                </td>
                <td className="p-6 hidden md:table-cell">
                  <div className="text-white/80">
                    <p className="flex items-center gap-2 text-lg">
                      <Mail size={14} />
                      {user.email}
                    </p>
                  </div>
                </td>
                <td className="p-6 hidden lg:table-cell">
                  <p className="text-white/80 flex items-center gap-2">
                    <Users2 size={14} />
                    {user.username}
                  </p>
                </td>
                <td className="p-6 hidden sm:table-cell">
                  <p className="text-white font-semibold">
                    {Format.formatDate(user.createdAt)}
                  </p>
                  <p className="text-white/60 text-sm">
                    {Format.formatTime(user.createdAt)}
                  </p>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
                      onClick={() => handleUserClick(user)}
                    >
                      <Eye
                        size={16}
                        className="text-white/70 hover:text-white"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
