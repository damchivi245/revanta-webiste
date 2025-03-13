/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/api";
import { Car, UpdateCar } from "@/types/types";
import { create } from "zustand";

interface CarState {
  car: Car | null;
  loading: boolean;
  error: string | null;

  setCar: (carData: Car | null) => void;
  fetchCar: (filters?: Record<string, any>) => Promise<void>;
  createCar: (carData: Car) => Promise<void>;
  updateCar: (id: string, carUpdateData: UpdateCar) => Promise<void>;
  updateCarImage: (id: string, file: File) => Promise<void>;
  updateCarModel: (id: string, file: File) => Promise<void>;
}

export const useCarStore = create<CarState>((set) => ({
  car: null,
  loading: false,
  error: null,

  setCar: (carData) => {
    set({ car: carData });
  },

  fetchCar: async (filters = {}) => {
    set({ loading: true });
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const res = await api.get(`/cars?${queryParams}`);
      console.log("Check res", res.data);
      set({ car: res.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message });
    } finally {
      set({ loading: false });
    }
  },
  createCar: async (carData) => {
    set({ loading: true });
    try {
      const res = await api.post("/cars", carData);
      set({ car: res.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message });
    } finally {
      set({ loading: false });
    }
  },

  updateCar: async (id, carUpdateData) => {
    set({ loading: true });
    try {
      const res = await api.patch(`/cars/${id}`, carUpdateData);
      set({ car: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateCarImage: async (id, file) => {
    set({ loading: true });
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await api.patch(`/cars/${id}/upload-model`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ car: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  updateCarModel: async (id, file) => {
    set({ loading: true });
    try {
      const formData = new FormData();
      formData.append("model", file);
      const res = await api.patch(`/cars/${id}/upload-model`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      set({ car: res.data });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));
