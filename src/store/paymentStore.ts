/* eslint-disable @typescript-eslint/no-explicit-any */
import api from "@/api/api";
import { PaymentData, CreatePaymentData, PaymentResponse } from "@/types/types";
import { toast } from "sonner";
import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

interface PaymentState {
  payment: CreatePaymentData | null;
  payments: PaymentResponse | null;

  bookingsResponseData: PaymentData | null;
  loading: boolean;
  error: string | null;

  fetchPaymentById: (id: string) => Promise<void>;
  fetchUserPayments: () => Promise<void>;
  createPayment: (payment: CreatePaymentData) => Promise<void>;
}

export const usePaymentStore = create<PaymentState>()(
  devtools(
    persist(
      (set) => ({
        payment: null,
        payments: null,
        bookingsResponseData: null,
        loading: false,
        error: null,

        fetchUserPayments: async () => {
          set({ loading: true, error: null });

          try {
            const res = await api.get(`/payment/user-payments`);
            set({ payments: res.data });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error";
            toast.warning(errorMessage);
            set({ error: errorMessage });
          } finally {
            set({ loading: false });
          }
        },

        fetchPaymentById: async (id) => {
          set({ loading: true, error: null });

          try {
            const res = await api.get(`/payment/${id}`);
            set({ payment: res.data });
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error";
            toast.warning(errorMessage);
            set({ error: errorMessage });
          } finally {
            set({ loading: false });
          }
        },

        createPayment: async (payment) => {
          set({ loading: true, error: null });

          try {
            const res = await api.post("/payment", payment);
            set({ bookingsResponseData: res.data });
            toast.success("Payment successfully!");
          } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error";
            toast.warning(errorMessage);
            set({ error: errorMessage });
          } finally {
            set({ loading: false });
          }
        },
      }),
      { name: "payment-store" }
    )
  )
);
