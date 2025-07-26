"use client";
import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import AddLapanganModal from "./components/AddLapanganModal";
import { isErrorResponse } from "@/utils/error-response";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonnerToast";
import { useFieldStore } from "@/store/field-store";
import { useShallow } from "zustand/shallow";
import LapanganStatsCard from "./components/LapanganStatsCard";
import LapanganFilters from "./components/LapanganFilters";
import LapanganSearch from "./components/LapanganSearch";
import LapanganHeader from "./components/LapanganHeader";
import LapanganCard from "./components/LapanganCard";
import { Field } from "@/store/field-store";

const DataLapanganPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterJenis, setFilterJenis] = useState("semua");
  const [filterStatus, setFilterStatus] = useState("semua");
  const [showAddModal, setShowAddModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [category, setCategory] = useState();
  const [editData, setEditData] = useState<Field | null>(null);

  const { fields, fetchField } = useFieldStore(
    useShallow((s) => ({ fields: s.fields, fetchField: s.fetchField }))
  );

  const fetchCategory = async () => {
    try {
      const res = await axiosInstance.get("/api/categories");
      setCategory(res.data.data);
    } catch (error) {
      console.error("Gagal mengambil data category", error);
    }
  };

  useEffect(() => {
    fetchField();
    fetchCategory();
    //eslint-disable-next-line
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(e.currentTarget);

      // Check if we're in edit mode
      const isEditMode = editData !== null;
      const fieldId = formData.get("id") as string;

      let res;
      if (isEditMode && fieldId) {
        // Update existing field
        res = await axiosInstance.patch(`/api/fields/${fieldId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } else {
        // Create new field
        res = await axiosInstance.post("/api/fields", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      showSuccess(res.data.message);
      setShowAddModal(false);
      setEditData(null);
      fetchField();
      fetchCategory();
    } catch (error) {
      isErrorResponse(
        error,
        `${editData ? "Update" : "Add"} lapangan failed. Please try again.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredLapangan = fields.filter((lapangan) => {
    const matchesSearch =
      lapangan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lapangan.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesJenis =
      filterJenis === "semua" || lapangan.category === filterJenis;
    const matchesStatus =
      filterStatus === "semua" || lapangan.status === filterStatus;

    return matchesSearch && matchesJenis && matchesStatus;
  });

  const handleRemoveLapangan = async (id: string) => {
    try {
      const res = await axiosInstance.delete(`/api/fields/${id}`);
      showSuccess(res.data.message);
      fetchField();
    } catch (error) {
      isErrorResponse(error, "Delete lapangan failed. Please try again.");
    }
  };

  const handleEditLapangan = (lapangan: Field) => {
    setEditData(lapangan);
    setShowAddModal(true);
  };

  const handleAddNew = () => {
    setEditData(null);
    setShowAddModal(true);
  };

  const handleCloseModal = () => {
    setShowAddModal(false);
    setEditData(null);
  };

  return (
    <>
      <div className="p-6 space-y-6">
        {/* Header */}
        <LapanganHeader setShowAddModal={handleAddNew} />

        {/* Search and Filter */}
        <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-6 mb-8 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <LapanganSearch
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            {/* Filters */}
            <LapanganFilters
              filterJenis={filterJenis}
              setFilterJenis={setFilterJenis}
              filterStatus={filterStatus}
              setFilterStatus={setFilterStatus}
              categorys={category!}
            />
          </div>
        </div>

        {/* Stats Cards */}
        <LapanganStatsCard fields={filteredLapangan} />

        {/* Lapangan Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredLapangan.map((lapangan) => (
            <LapanganCard
              key={lapangan.id}
              lapangan={lapangan}
              removeLapangan={handleRemoveLapangan}
              editLapangan={handleEditLapangan}
            />
          ))}
        </div>

        {filteredLapangan.length === 0 && (
          <div className="text-center py-12">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 p-8 inline-block">
              <MapPin className="mx-auto text-white/60 mb-4" size={48} />
              <h3 className="text-xl font-semibold text-white mb-2">
                Tidak ada lapangan ditemukan
              </h3>
              <p className="text-blue-100/80">
                Coba ubah kata kunci pencarian atau filter Anda
              </p>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddLapanganModal
          handleSubmit={handleSubmit}
          setShowAddModal={handleCloseModal}
          isSubmitting={isSubmitting}
          editData={editData}
        />
      )}
    </>
  );
};

export default DataLapanganPage;
