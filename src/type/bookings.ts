import { category } from "./category";
import { User } from "./user";

export enum BookingStatus {
  PENDING = "PENDING",
  CONFIRMED = "CONFIRMED",
  CANCELED = "CANCELED",
  COMPLETED = "COMPLETED",
}

export type booking = {
  bookingId: string;
  userId: string;
  user: User;
  field: {
    id: string;
    name: string;
    location: string;
    description?: string | null;
    image?: string | null;
    pricePerHour: number;
    category: category;
    operationalHour?: string | null;
    capacity: number;
    status?: string | null;
  };
  startTime: Date;
  endTime: Date;
  durationHours: number;
  totalPrice: number;
  status: BookingStatus;
  createdAt: Date;
};

export type BookingPage = {
  data: booking[];
  paging: {
    size: number;
    total_page: number;
    current_page: number;
  };
};
