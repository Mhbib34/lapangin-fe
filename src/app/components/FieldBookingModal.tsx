import React, { useEffect, useState } from "react";
import { X, Clock, MapPin } from "lucide-react";
import Image from "next/image";
import { Field } from "@/type/fields";
import { Format } from "@/utils/format";
import { isErrorResponse } from "@/utils/error-response";
import axiosInstance from "@/lib/axiosInstance";
import { showSuccess } from "@/lib/sonnerToast";
import { useBookingStore } from "@/store/booking-store";
import { useShallow } from "zustand/shallow";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  field?: Field;
}

const FieldBookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  field,
}) => {
  const { FetchBookingsByUser } = useBookingStore(
    useShallow((s) => ({
      FetchBookingsByUser: s.fetchBookingByUser,
    }))
  );

  const [formData, setFormData] = useState({
    fieldId: field?.id,
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    if (field?.id) {
      setFormData((prev) => ({
        ...prev,
        fieldId: field.id,
      }));
    }
  }, [field]);

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    const duration = Format.calculateDuration(
      formData.startTime,
      formData.endTime
    );
    return duration * field!.pricePerHour || 0;
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    console.log(formData.fieldId);

    try {
      const res = await axiosInstance.post("/api/bookings", formData);
      console.log(res.data.message);
      showSuccess(
        "Berhasil booking lapangan, Kami akan segera menghubungi anda untuk konfirmasi. Terima kasih!"
      );
      FetchBookingsByUser();
      onClose();
    } catch (error) {
      setIsLoading(false);
      isErrorResponse(error, "Gagal booking lapangan. Silahkan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Glassmorphism Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 border-b border-white/10">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 group"
            >
              <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <h2 className="text-2xl font-bold text-white mb-2">
              Booking Lapangan
            </h2>
            <p className="text-white/80">
              Isi form di bawah untuk melakukan pemesanan
            </p>
          </div>

          {/* Content */}
          <div className="max-h-[calc(90vh-120px)] overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
              {/* Lapangan Info */}
              <div className="space-y-4">
                <div className="relative w-full h-48  rounded-2xl overflow-hidden group">
                  {field?.image && (
                    <Image
                      src={field.image}
                      alt={field.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-bold text-lg">{field!.name}</h3>
                    <p className="text-sm text-white/80">{field?.category}</p>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                  <div className="flex items-center gap-3 mb-3">
                    <MapPin className="w-5 h-5 text-blue-400" />
                    <span className="text-white/90">{field?.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white/70">Harga per jam:</span>
                    <span className="text-xl font-bold text-green-400">
                      {Format.formatCurrency(field!.pricePerHour)}
                    </span>
                  </div>
                </div>

                {/* Total Harga */}
                <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">
                      Total Pembayaran:
                    </span>
                    <span className="text-2xl font-bold text-green-400">
                      Rp {calculateTotal().toLocaleString("id-ID")}
                    </span>
                  </div>
                  <p className="text-white/60 text-sm mt-1">
                    {Format.calculateDuration(
                      formData.startTime,
                      formData.endTime
                    )}{" "}
                    jam × Rp {field!.pricePerHour?.toLocaleString("id-ID")}
                  </p>
                </div>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1  gap-4">
                    <div className="space-y-2">
                      <label className="block text-white/90 font-medium">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Jam Mulai
                      </label>
                      <input
                        type="datetime-local"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="block text-white/90 font-medium">
                        Jam Selesai
                      </label>
                      <input
                        type="datetime-local"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white font-medium transition-all duration-300 backdrop-blur-sm"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                    >
                      {isLoading ? (
                        <span className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Memproses...
                        </span>
                      ) : (
                        "Konfirmasi Booking"
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldBookingModal;
