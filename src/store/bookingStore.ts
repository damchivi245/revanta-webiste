/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/api";
import { Booking } from "@/types/types";
import { create } from "zustand";

interface BookingState {
  booking: Booking | null;
  loading: boolean;
  error: string | null;
  setBooking: (bookingData: Booking | null) => void;
  fetchBooking: (bookingId?: string) => Promise<void>;
  createBooking: (bookingData: Booking) => Promise<void>;
}

export const useBookingStore = create<BookingState>((set) => ({
  booking: null,
  loading: false,
  error: null,

  setBooking: (bookingData) => {
    set({ booking: bookingData });
  },

  fetchBooking: async (bookingId?: string) => {
    set({ loading: true, error: null });
    try {
      const res = await api.get(`/bookings/${bookingId}`);
      set({ booking: res.data });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to fetch booking",
      });
    } finally {
      set({ loading: false });
    }
  },

  createBooking: async (bookingData: Booking) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/bookings", { bookingData });
      set({ booking: res.data });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Failed to create booking",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
