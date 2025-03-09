import axios from "axios";
import { useAuthStore } from "@/store/authStore"; // Import Zustand Store

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // Gửi cookie HTTP-only (refreshToken)
});

// Thêm token vào headers trước mỗi request
api.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken; // ✅ Lấy token từ Zustand
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// api.interceptors.response.use((response) => {
//   if (response.data?.data?.accessToken) {
//     response.data = response.data.data;
//   }
//   return response;
// });
// Xử lý khi accessToken hết hạn (401 Unauthorized)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const res = await axios.get<{ accessToken: string }>(
          ` ${import.meta.env.VITE_API_BASE_URL}/refresh-token"`,
          { withCredentials: true }
        );

        const newToken = res.data.accessToken;
        useAuthStore.getState().setAccessToken(newToken); // ✅ Lưu vào Zustand
        // Gửi lại request với accessToken mới
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return api(error.config);
      } catch (refreshError) {
        console.error(
          "Refresh token expired. Please login again.",
          refreshError
        );
        useAuthStore.getState().logout(); // Xóa token trong Zustand
        window.location.href = "/login"; // Chuyển hướng đăng nhập
      }
    }
    return Promise.reject(error);
  }
);

export default api;
