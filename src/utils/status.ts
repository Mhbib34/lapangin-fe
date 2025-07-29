import { BookingStatus } from "@/type/bookings";
import { Check, Clock, X } from "lucide-react";

export const getStatusConfig = (status: BookingStatus) => {
  switch (status) {
    case BookingStatus.PENDING:
      return {
        color: "text-amber-400 bg-amber-400/20",
        label: "Pending",
        icon: Clock,
      };
    case BookingStatus.CONFIRMED:
      return {
        color: "text-blue-400 bg-blue-400/20",
        label: "Dikonfirmasi",
        icon: Check,
      };
    case BookingStatus.COMPLETED:
      return {
        color: "text-emerald-400 bg-emerald-400/20",
        label: "Selesai",
        icon: Check,
      };
    case BookingStatus.CANCELED:
      return {
        color: "text-red-400 bg-red-400/20",
        label: "Dibatalkan",
        icon: X,
      };
    default:
      return {
        color: "text-gray-400 bg-gray-400/20",
        label: status,
        icon: Clock,
      };
  }
};

export const getLapanganStatusColor = (status: string) => {
  switch (status) {
    case "ACTIVE":
      return "text-emerald-400 bg-emerald-400/20";
    case "NONACTIVE":
      return "text-red-400 bg-red-400/20";
    case "MAINTENANCE":
      return "text-amber-400 bg-amber-400/20";
    default:
      return "text-gray-400 bg-gray-400/20";
  }
};
