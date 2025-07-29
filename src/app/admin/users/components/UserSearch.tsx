import { Search } from "lucide-react";
import React from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
};

const UserSearch = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 p-6 mb-8 shadow-2xl">
      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="relative w-full">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari nama atau email user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl py-3 pl-12 pr-4 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default UserSearch;
