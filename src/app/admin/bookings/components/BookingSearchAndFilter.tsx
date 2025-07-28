import { BookingStatus } from "@/type/bookings";
import { Search } from "lucide-react";
import React from "react";

type Props = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  filterStatus: BookingStatus;
  setFilterStatus: React.Dispatch<React.SetStateAction<BookingStatus>>;
  filterDate: string;
  setFilterDate: React.Dispatch<React.SetStateAction<string>>;
};

const BookingSearchAndFilter = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterDate,
  setFilterDate,
}: Props) => {
  return (
    <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-8 shadow-xl">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"
            size={20}
          />
          <input
            type="text"
            placeholder="Cari nama user, lapangan, atau email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm"
          />
        </div>

        <div className="flex gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as BookingStatus)}
            className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
          >
            <option className="text-black bg-white" value="semua">
              Semua Status
            </option>
            <option
              className="text-black bg-white"
              value={BookingStatus.PENDING}
            >
              Pending
            </option>
            <option
              className="text-black bg-white"
              value={BookingStatus.CONFIRMED}
            >
              Dikonfirmasi
            </option>
            <option
              className="text-black bg-white"
              value={BookingStatus.COMPLETED}
            >
              Selesai
            </option>
            <option
              className="text-black bg-white"
              value={BookingStatus.CANCELED}
            >
              Dibatalkan
            </option>
          </select>

          <input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="px-4 py-3 bg-white/10 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 backdrop-blur-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingSearchAndFilter;
