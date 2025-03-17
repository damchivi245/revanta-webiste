/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/api";
import { BookingData, CreateBookingData } from "@/types/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface BookingState {
  booking: CreateBookingData | null;
  bookings: BookingData[];
  totalPrice: number;
  loading: boolean;
  error: string | null;
  setTotalPrice: (totalPrice: number) => void;
  setBooking: (bookingData: CreateBookingData | null) => void;
  createBooking: () => Promise<void>;
  clearBooking: () => void;
}

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      booking: null,
      bookings: [],
      loading: false,
      error: null,
      totalPrice: 0,

      setTotalPrice: (price: number) => set({ totalPrice: price }),

      setBooking: (bookingData) => set({ booking: bookingData }),

      createBooking: async () => {
        const { booking } = get();
        if (!booking) return;

        set({ loading: true, error: null });

        try {
          await api.post("/bookings", booking);
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
);
