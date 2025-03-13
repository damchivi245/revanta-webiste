/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import api from "@/api/api";
import { UpdateUser, User } from "@/types/types";
import { useAuthStore } from "@/store/authStore";

interface UserState {
  loading: boolean;
  error: string | null;
  updateUser: (id: string, userData: UpdateUser) => Promise<void>;
  updateUserImage: (id: string, file: File) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  loading: false,
  error: null,

  updateUser: async (id, userData) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Bạn chưa đăng nhập");

      const res = await api.patch(`users/update/${id}`, userData);

      // 🛠 Cập nhật user mới vào `useAuthStore`
      useAuthStore.getState().setUser(res.data);
    } catch (error: any) {
      set({
        error: error.response?.data?.message || "Không thể cập nhật thông tin",
      });
    } finally {
      set({ loading: false });
    }
  },

  updateUserImage: async (id, file) => {
    set({ loading: true, error: null });
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Authorize");

      const formData = new FormData();
      formData.append("file", file);

      const res = await api.patch(`/users/upload-avatar/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // 🛠 Cập nhật user mới vào `useAuthStore`
      const currentUser = useAuthStore.getState().user;
      useAuthStore.getState().setUser({
        ...currentUser,
        image: res.data.image,
      } as User);
    } catch (error: any) {
      set({
        error:
          error.response?.data?.message || "Không thể cập nhật ảnh đại diện",
      });
    } finally {
      set({ loading: false });
    }
  },
}));
