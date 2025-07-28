import { Search } from "lucide-react";
import React from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const LapanganSearch = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="relative flex-1">
      <Search
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"
        size={20}
      />
      <input
        type="text"
        placeholder="Cari nama lapangan, lokasi, atau jenis lapangan"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm"
      />
    </div>
  );
};

export default LapanganSearch;
