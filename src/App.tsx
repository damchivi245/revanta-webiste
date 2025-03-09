import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/Auth/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthLayout from "./layouts/AuthLayout";
import RegisterPage from "./pages/Auth/RegisterPage";
import ForgotPasswordPage from "./pages/Auth/ForgotPasswordPage";
import { Toaster } from "@/components/ui/sonner";
import ProductsPage from "./pages/Product/ProductsPage";
import ProductDetailPage from "./pages/Product/ProductDetail";
import BookingPage from "./pages/Payment/BookingPage";
import PaymentPage from "./pages/Payment/PaymentPage";
import UserProfilePage from "./pages/User/UserProfilePage";

import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/user/:id" element={<UserProfilePage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster position="top-center" expand={false} richColors />
    </Router>
  );
}
