/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/api";
import { create } from "zustand";
interface AuthState {
  user: { id: string; name: string } | null;
  accessToken: string | null;
  setUser: (user: { id: string; name: string } | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
  refreshAccessToken: () => Promise<string | undefined>;
}
const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setUser: (user: any) => set({ user }),
  setAccessToken: (token) => set({ accessToken: token }),

  logout: () => {
    set({ user: null, accessToken: null });
    localStorage.removeItem("accessToken");
    window.location.href = "/login"; // Chuyển hướng về trang login
  },

  refreshAccessToken: async () => {
    try {
      const res = await api.get("/refresh-token", { withCredentials: true });
      set({ accessToken: res.data.accessToken });
      return res.data.accessToken;
    } catch {
      console.error("Refresh token expired. Logging out...");
      useAuthStore.getState().logout();
    }
  },
}));

export default useAuthStore;
