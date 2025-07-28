import { booking } from "@/type/bookings";

export class Format {
  static currency(value: number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  }

  static formatDate = (dateRaw: string | Date) => {
    const date = new Date(dateRaw);

    if (isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(date);
  };

  static formatTime = (dateRaw: string | Date) => {
    const date = new Date(dateRaw);

    if (isNaN(date.getTime())) return "-";

    return new Intl.DateTimeFormat("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };
}

export class FormatAdmin {
  static calculateDuration = (
    startTimeRaw: Date | string,
    endTimeRaw: Date | string
  ) => {
    const startTime = new Date(startTimeRaw);
    const endTime = new Date(endTimeRaw);

    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      return 0; // atau bisa lempar error jika perlu
    }

    const diffMs = endTime.getTime() - startTime.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    return diffHours;
  };

  static calculateTotal = (booking: booking) => {
    const duration = this.calculateDuration(booking.startTime, booking.endTime);
    return duration * booking.field.pricePerHour;
  };
}
