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
