import { BookingStatus } from "@/type/bookings";
import { Check, Clock, X } from "lucide-react";

export const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "text-green-400 bg-green-400/20";
    case "pending":
      return "text-yellow-400 bg-yellow-400/20";
    case "cancelled":
      return "text-red-400 bg-red-400/20";
    default:
      return "text-gray-400 bg-gray-400/20";
  }
};

export const getStatusText = (status: string) => {
  switch (status) {
    case "confirmed":
      return "Dikonfirmasi";
    case "pending":
      return "Menunggu";
    case "cancelled":
      return "Dibatalkan";
    default:
      return status;
  }
};

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
