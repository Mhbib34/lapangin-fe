import { Plus } from "lucide-react";
import React from "react";

const LapanganHeader = ({
  setShowAddModal,
}: {
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-8 mb-8 shadow-2xl">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-white to-blue-200 bg-clip-text">
            Data Lapangan
          </h1>
          <p className="text-blue-100/80">
            Kelola semua lapangan olahraga Anda
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => setShowAddModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <Plus size={20} />
            Tambah Lapangan
          </button>
        </div>
      </div>
    </div>
  );
};

export default LapanganHeader;
