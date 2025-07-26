import { showConfirm } from "@/lib/sonnerToast";
import { Field } from "@/store/field-store";
import { Clock, Edit, MapPin, Trash2, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  lapangan: Field;
  removeLapangan: (id: string) => void;
  editLapangan: (lapangan: Field) => void;
};

const LapanganCard = ({ lapangan, removeLapangan, editLapangan }: Props) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "text-emerald-400 bg-emerald-400/20";
      case "NONACTIVE":
        return "text-red-400 bg-red-400/20";
      case "MAINTENANCE":
        return "text-amber-400 bg-amber-400/20";
      default:
        return "text-gray-400 bg-gray-400/20";
    }
  };

  const handleEdit = () => {
    editLapangan(lapangan);
  };

  return (
    <div
      key={lapangan.id}
      className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={lapangan.image!}
          alt={lapangan.name}
          fill
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
              lapangan.status!
            )}`}
          >
            {lapangan.status}
          </span>
        </div>
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs font-medium">
            {lapangan.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-blue-200 transition-colors">
            {lapangan.name}
          </h3>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2 text-blue-100/80">
            <MapPin size={16} />
            <span className="text-sm">{lapangan.location}</span>
          </div>

          <div className="flex items-center gap-2 text-blue-100/80">
            <Clock size={16} />
            <span className="text-sm">{lapangan.operationalHour}</span>
          </div>

          <div className="flex items-center gap-2 text-blue-100/80">
            <Users size={16} />
            <span className="text-sm">
              Kapasitas: {lapangan.capacity} orang
            </span>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-white">
              Rp {lapangan.pricePerHour.toLocaleString("id-ID")}
            </span>
            <span className="text-blue-100/80 text-sm">/jam</span>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleEdit}
              className="p-2 bg-blue-500/20 backdrop-blur-sm rounded-lg text-blue-200 hover:bg-blue-500/30 transition-colors"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() =>
                showConfirm(
                  "Apakah anda yakin?",
                  lapangan.name,
                  () => removeLapangan(lapangan.id),
                  "Hapus"
                )
              }
              className="p-2 bg-red-500/20 backdrop-blur-sm rounded-lg text-red-200 hover:bg-red-500/30 transition-colors"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LapanganCard;
