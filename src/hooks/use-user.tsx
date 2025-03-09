import api from "@/api/api";
import { useAuthStore } from "@/store/authStore";
import { User } from "@/types/types";
import { useEffect, useState } from "react";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      try {
        const res = await api.get("/me");
        setUser(res.data);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin user:", error);
      }
    };

    fetchUser();
  }, [token]);

  return user;
};
