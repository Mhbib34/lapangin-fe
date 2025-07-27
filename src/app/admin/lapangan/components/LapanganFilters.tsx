import { category } from "@/type/category";
import React from "react";

type Props = {
  filterJenis: string;
  setFilterJenis: React.Dispatch<React.SetStateAction<string>>;
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
  categorys: category[];
};

const LapanganFilters = ({
  filterJenis,
  setFilterJenis,
  filterStatus,
  setFilterStatus,
  categorys,
}: Props) => {
  return (
    <div className="flex gap-4">
      <select
        value={filterJenis}
        onChange={(e) => setFilterJenis(e.target.value)}
        className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm "
      >
        <option className="text-black bg-white" value="semua">
          Semua Jenis
        </option>
        {categorys &&
          categorys.map((category) => (
            <option
              className="text-black bg-white"
              key={category.id}
              value={category.name}
            >
              {category.name}
            </option>
          ))}
      </select>

      <select
        value={filterStatus}
        onChange={(e) => setFilterStatus(e.target.value)}
        className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
      >
        <option className="text-black bg-white" value="semua">
          Semua Status
        </option>
        <option className="text-black bg-white" value="ACTIVE">
          Aktif
        </option>
        <option className="text-black bg-white" value="NONACTIVE">
          Non-aktif
        </option>
        <option className="text-black bg-white" value="MAINTENANCE">
          Maintenance
        </option>
      </select>
    </div>
  );
};

export default LapanganFilters;
