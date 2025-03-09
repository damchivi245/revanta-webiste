/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/api";
import { User } from "@/types/types";
import { create } from "zustand";
import { toast } from "sonner";

interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  setAccessToken: (token: string | null) => void;
  setUser: (userData: User | null) => void;
  register: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;

  fetchUser: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: localStorage.getItem("accessToken") || null,
  user: null,
  loading: false,
  error: null,

  setAccessToken: (token) => {
    set({ accessToken: token });
    if (token) {
      localStorage.setItem("accessToken", token);
    } else {
      localStorage.removeItem("accessToken");
    }
  },

  setUser: (userData) => {
    set({ user: userData });
  },

  register: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const res = await api.post("/register", { email, password });
      console.log("Check res:", res);
      toast.success(res.data.message);
    } catch (error: any) {
      set({ error: error.response?.data.message });
      toast.error(error.response?.data.message);
    } finally {
      set({ loading: false });
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });

    try {
      const res = await api.post("/login", { email, password });
      console.log("Check res", res);
      const token = res.data.data.accessToken;
      if (!token) throw new Error("Không nhận được accessToken");
      get().setAccessToken(token);
      await get().fetchUser();

      toast.success(res.data.message);
    } catch (error: any) {
      set({ error: error.response?.data.message });
      toast.error(error.data.message);
    } finally {
      set({ loading: false });
    }
  },

  fetchUser: async () => {
    try {
      const token = get().accessToken;
      if (!token) return;

      const res = await api.get("/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ user: res.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Lỗi lấy thông tin user" });
    }
  },

  logout: () => {
    localStorage.removeItem("accessToken");
    set({ accessToken: null, user: null });
  },
}));

if (localStorage.getItem("accessToken")) {
  useAuthStore.getState().fetchUser();
}
