import { showError } from "@/lib/sonnerToast";
import { AxiosError } from "axios";

export const isErrorResponse = (error: unknown, message: string) => {
  const err = error as AxiosError<{ errors: string }>;
  const errorMessage = err.response?.data?.errors || message;
  showError(errorMessage);
};
