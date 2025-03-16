/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/api";
import { BookingData, CreateBooking } from "@/types/types";
import { toast } from "sonner";
import { create } from "zustand";

interface BookingState {
  booking: BookingData | null;
  bookings: BookingData[];
  loading: boolean;
  error: string | null;
  setBooking: (bookingData: BookingData | null) => void;
  fetchBooking: (bookingId?: string) => Promise<void>;
  fetchBookingsByUser: (userId: string) => Promise<void>;
  createBooking: (bookingData: CreateBooking) => Promise<void>;
}

const STORAGE_KEY = "bookingStore";

const getInitialState = (): BookingState => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  return storedData
    ? JSON.parse(storedData)
    : {
        booking: null,
        bookings: [],
        loading: false,
        error: null,
        setBooking: () => {},
        fetchBooking: async () => {},
        fetchBookingsByUser: async () => {},
        createBooking: async () => {},
      };
};

export const useBookingStore = create<BookingState>((set) => {
  const saveToStorage = (state: BookingState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  };

  return {
    ...getInitialState(),

    setBooking: (bookingData) => {
      set((state) => {
        const newState = { ...state, booking: bookingData };
        saveToStorage(newState);
        return newState;
      });
    },

    fetchBooking: async (bookingId?: string) => {
      set({ loading: true, error: null });
      try {
        const res = await api.get(`/bookings/${bookingId}`);
        set((state) => {
          const newState = { ...state, booking: res.data };
          saveToStorage(newState);
          return newState;
        });
      } catch (error: any) {
        set({
          error: error.response?.data?.message || "Failed to fetch booking",
        });
      } finally {
        set({ loading: false });
      }
    },

    fetchBookingsByUser: async (userId: string) => {
      set({ loading: true, error: null });
      try {
        const res = await api.get(`bookings/users/${userId}`);
        set((state) => {
          const newState = { ...state, bookings: res.data };
          saveToStorage(newState);
          return newState;
        });
      } catch (error: any) {
        set({
          error:
            error.response?.data?.message || "Failed to fetch user bookings",
        });
      } finally {
        set({ loading: false });
      }
    },

    createBooking: async (bookingData: CreateBooking) => {
      set({ loading: true, error: null });
      try {
        const res = await api.post("/bookings", bookingData);
        set((state) => {
          const newState = { ...state, booking: res.data };
          saveToStorage(newState);
          return newState;
        });
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Failed to create booking";
        toast.error(errorMessage);
        set({ error: errorMessage });
        throw new Error(errorMessage);
      } finally {
        set({ loading: false });
      }
    },
  };
});
