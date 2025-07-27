import { Field } from "@/type/fields";
import { MapPin, Users, Wrench, XOctagonIcon } from "lucide-react";
import React from "react";

const LapanganStatsCard = ({ fields }: { fields: Field[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      {[
        {
          label: "Total Lapangan",
          value: fields.length,
          color: "from-blue-500 to-cyan-500",
          icon: MapPin,
        },
        {
          label: "Lapangan Aktif",
          value: fields.filter((l) => l.status === "ACTIVE").length,
          color: "from-emerald-500 to-teal-500",
          icon: Users,
        },
        {
          label: "Lapangan Non-aktif",
          value: fields.filter((l) => l.status === "NONACTIVE").length,
          color: "from-red-500 to-rose-500",
          icon: XOctagonIcon,
        },
        {
          label: "Lapangan Maintenance",
          value: fields.filter((l) => l.status === "MAINTENANCE").length,
          color: "from-yellow-500 to-amber-500",
          icon: Wrench,
        },
      ].map((stat, index) => (
        <div
          key={index}
          className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
        >
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4`}
          >
            <stat.icon className="text-white" size={24} />
          </div>
          <h3 className="text-2xl font-bold text-white mb-1">{stat.value}</h3>
          <p className="text-blue-100/80 text-sm">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default LapanganStatsCard;
