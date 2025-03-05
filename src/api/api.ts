import axios from "axios";

// Tạo Axios instance
const api = axios.create({
  baseURL: "https://your-api.com",
  withCredentials: true, // Cho phép gửi cookie HTTP-only
});

// Interceptor để tự động refresh token khi accessToken hết hạn
api.interceptors.response.use(
  (response) => response, // Trả về nếu không có lỗi
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Gọi API refresh-token để lấy accessToken mới
        const res = await axios.get("https://your-api.com/refresh-token", {
          withCredentials: true, // Gửi cookie HTTP-only chứa refreshToken
        });

        // Cập nhật accessToken mới vào headers
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;

        // Gửi lại request ban đầu với accessToken mới
        return api(error.config);
      } catch (refreshError) {
        console.error(
          "Refresh Token expired. Please login again.",
          refreshError
        );
        window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
      }
    }
    return Promise.reject(error);
  }
);

export default api;
