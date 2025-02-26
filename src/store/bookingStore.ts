import { create } from "zustand";

interface BookingState {
  selectedCar: string | null;
  startDate: string | null;
  endDate: string | null;
  email: string;
  setBooking: (data: Partial<BookingState>) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>((set) => ({
  selectedCar: null,
  startDate: null,
  endDate: null,
  email: "",
  setBooking: (data) => set((state) => ({ ...state, ...data })),
  resetBooking: () =>
    set({ selectedCar: null, startDate: null, endDate: null, email: "" }),
}));
