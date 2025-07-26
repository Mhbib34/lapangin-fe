"use client";
import React from "react";
import AdminForm from "../../components/AdminForm";
import {
  Activity,
  Building,
  ChevronDown,
  Clock,
  DollarSign,
  FileText,
  ImageIcon,
  MapPin,
  Tag,
  Users,
} from "lucide-react";

const AddLapanganModal = ({
  handleSubmit,
  setShowAddModal,
  isSubmitting,
}: {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  isSubmitting: boolean;
}) => {
  return (
    <AdminForm
      title="Lapangan"
      titleText="Tambahkan lapangan baru"
      handleSubmit={handleSubmit}
      isSubmitting={isSubmitting}
      setShowAddModal={setShowAddModal}
    >
      {/* Name and Location Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="text"
            name="name"
            placeholder="Enter field name"
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
          />
          <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        </div>
        <div className="relative">
          <input
            type="text"
            name="location"
            placeholder="Enter field location"
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
          />
          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        </div>
        <div className="relative">
          <input
            type="text"
            name="category"
            placeholder="Enter field category"
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
          />
          <Tag className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        </div>
      </div>

      {/* Capacity and Price Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <input
            type="number"
            name="capacity"
            placeholder="Enter field capacity"
            min="1"
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
          />
          <Users className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        </div>
        <div className="relative">
          <input
            type="number"
            name="pricePerHour"
            placeholder="Enter field price"
            min="0"
            step="1000"
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
          />
          <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
        </div>
        <div className="relative">
          <select
            name="status"
            className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 pr-12 text-white focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 appearance-none"
          >
            <option value="" className="bg-gray-800 text-white">
              Select field status
            </option>
            <option value="ACTIVE" className="bg-gray-800 text-white">
              ACTIVE
            </option>
            <option value="NONACTIVE" className="bg-gray-800 text-white">
              NONACTIVE
            </option>
            <option value="MAINTENANCE" className="bg-gray-800 text-white">
              Maintenance
            </option>
          </select>
          <Activity className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
          <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50 pointer-events-none" />
        </div>
      </div>

      {/* Operational Hour */}
      <div className="relative">
        <input
          type="text"
          name="operationalHour"
          placeholder="e.g., 08:00 - 22:00"
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
        />
        <Clock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
      </div>

      {/* Description */}
      <div className="relative">
        <textarea
          name="description"
          placeholder="Enter field description..."
          rows={4}
          maxLength={500}
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white placeholder-white/50 focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300 resize-none"
        />
        <FileText className="absolute left-4 top-4 w-4 h-4 text-white/50" />
      </div>

      {/* Image Upload */}
      <div className="relative">
        <input
          type="file"
          name="image"
          accept="image/jpeg,image/png,image/webp"
          className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl py-4 px-4 pl-12 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/20 file:text-white hover:file:bg-white/30 file:cursor-pointer focus:outline-none focus:border-white/40 focus:bg-white/20 transition-all duration-300"
        />
        <ImageIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/50" />
      </div>
    </AdminForm>
  );
};

export default AddLapanganModal;
