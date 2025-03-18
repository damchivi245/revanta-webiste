/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/api";
import {
  BookingData,
  CreateBookingData,
  CreateBookingVerifyData,
} from "@/types/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface BookingState {
  booking: CreateBookingData | null;
  otp: CreateBookingVerifyData | null;
  bookingsResponseData: BookingData | null;
  days: number;
  totalPrice: number;
  loading: boolean;
  error: string | null;
  setDays: (days: number) => void;
  setTotalPrice: (totalPrice: number) => void;
  setBooking: (bookingData: CreateBookingData | null) => void;
  createBooking: () => Promise<void>;
  verifyBooking: (otpData: CreateBookingVerifyData) => Promise<void>;

  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  devtools(
    persist(
      (set, get) => ({
        booking: null,
        bookingsResponseData: null,
        otp: null,
        loading: false,
        error: null,
        days: 0,
        totalPrice: 0,

        setTotalPrice: (price: number) => set({ totalPrice: price }),
        setDays: (day: number) => set({ days: day }),
        setBooking: (bookingData) => set({ booking: bookingData }),

        createBooking: async () => {
          const { booking } = get();
          if (!booking) return;

          set({ loading: true, error: null });

          try {
            const res = await api.post("/bookings", booking);
            const currentBooking = res.data;

            set({ bookingsResponseData: currentBooking });
          } catch (error: any) {
            toast.warning(error?.message);
            set({ error: error?.message || "Đã xảy ra lỗi" });
          } finally {
            set({ loading: false });
          }
        },

        verifyBooking: async (otpData: CreateBookingVerifyData) => {
          set({ loading: true, error: null });
          try {
            const res = await api.post("/bookings/verify-otp", otpData);
            toast.success(res.data.message);
          } catch (error: any) {
            toast.warning(error?.message);

            set({ error: error?.message || "Đã xảy ra lỗi" });
          } finally {
            set({ loading: false });
          }
        },
        clearBooking: () => set({ booking: null, totalPrice: 0 }),
      }),
      { name: "booking-store" }
    )
  )
);
