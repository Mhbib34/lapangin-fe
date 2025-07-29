import { User } from "@/type/user";
import { Format } from "@/utils/format";
import { Calendar, Mail, Phone, Users2, UserSquare } from "lucide-react";
import React from "react";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedUser: User;
};

const UserDetailModal = ({ setShowModal, selectedUser }: Props) => {
  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={() => setShowModal(false)}
    >
      <div
        className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 max-w-2xl w-full p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Detail User</h2>
          <button
            onClick={() => setShowModal(false)}
            className="p-2 hover:bg-white/10 rounded-xl transition-all duration-300"
          >
            <span className="text-white text-xl">×</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-xl bg-white/10 border border-white/20">
                {selectedUser.name
                  .split(" ")
                  .map((name) => name.charAt(0))
                  .join("")}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  {selectedUser.name}
                </h3>
              </div>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-sm mb-1">Email</p>
              <p className="text-white flex items-center gap-2">
                <Mail size={16} />
                {selectedUser.email}
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-sm mb-1">Telepon</p>
              <p className="text-white flex items-center gap-2">
                <Phone size={16} />
                {selectedUser.phone || "-"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-sm mb-1">Username</p>
              <p className="text-white flex items-center gap-2">
                <UserSquare size={16} />
                {selectedUser.username}
              </p>
            </div>

            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-sm mb-1">Bergabung</p>
              <p className="text-white flex items-center gap-2">
                <Calendar size={16} />
                {Format.formatDate(selectedUser.createdAt)}
              </p>
            </div>
            <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-4 border border-white/10">
              <p className="text-white/60 text-sm mb-1">Role</p>
              <p className="text-white flex items-center gap-2">
                <Users2 size={16} />
                {selectedUser.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailModal;
