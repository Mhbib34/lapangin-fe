import { Search } from "lucide-react";
import React from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedSport: string;
  setSelectedSport: React.Dispatch<React.SetStateAction<string>>;
  priceRange: number[];
  setPriceRange: React.Dispatch<React.SetStateAction<number[]>>;
  showFilters: boolean;
  setShowFilters: React.Dispatch<React.SetStateAction<boolean>>;
  sortBy: string;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
};

const HomeSearchFilters = ({ searchTerm, setSearchTerm }: Props) => {
  return (
    <section className="mb-8">
      <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 border border-white/20 shadow-2xl">
        <div className=" mb-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
            <input
              type="text"
              placeholder="Cari lapangan, lokasi, atau jenis lapangan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-2xl backdrop-blur-sm bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSearchFilters;
