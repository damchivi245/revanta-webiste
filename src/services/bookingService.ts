/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const sendOTP = async (email: string) => {
  return axios.post(`${API_URL}/send-otp`, { email });
};

export const verifyOTP = async (email: string, otp: string) => {
  return axios.post(`${API_URL}/verify-otp`, { email, otp });
};

export const createBooking = async (bookingData: any) => {
  return axios.post(`${API_URL}/bookings`, bookingData);
};
