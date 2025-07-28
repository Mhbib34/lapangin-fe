import React from "react";

type Props = {
  filterStatus: string;
  setFilterStatus: React.Dispatch<React.SetStateAction<string>>;
};

const LapanganFilters = ({ filterStatus, setFilterStatus }: Props) => {
  return (
    <div className="flex gap-4">
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
