// 📌 UserData
export interface User {
  data: {
    id: string;
    email: string;
    password: string;
    accessToken: string;
    role: string;
    image?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    phone?: string;
  };
  pagination?: Pagination;
  success?: boolean;
  message?: string;
}

export type Pagination = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export interface UpdateUser {
  firstName?: string | undefined;
  lastName?: string | undefined;
  address?: string | undefined;
  phone?: string | undefined;
}

// 📌 Car Data
enum CarStatus {
  "AVAILABLE",
  "RENTED",
  "MAINTENANCE",
}
export interface Car {
  data: {
    id: string;
    name: string;
    brand: string;
    model: string;
    year: string;
    price: number;
    seats: number;
    transmission: string;
    fuel: string;
    consumption: string;
    content?: string;
    image?: string;
    model3d?: string;
    status: CarStatus;
    colors: string[];
  };
  pagination?: Pagination;
  success?: boolean;
  message?: string;
}

export interface UpdateCar {
  name: string;
  brand: string;
  model: string;
  year: string;
  price: number;
  seats: number;
  transmission: string;
  fuel: string;
  consumption: string;
  content?: string;
  image?: string;
  model3d?: string;
  status: CarStatus;
  colors: string[];
}

// 📌 Booking Data
export interface CreateBookingData {
  carId: string;
  pickUp: string;
  startDate: Date;
  endDate: Date;
}

export interface BookingData {
  data: {
    id: string;
    userId: string;
    user: User;
    carId: string;
    car: Car;
    startDate: Date;
    endDate: Date;
    pickUp: string;
    otp: string;
    otpExpires: Date;
    status: BookingStatus;
  };
  success?: boolean;
  message?: string;
}
enum BookingStatus {
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
}

export interface CreateBookingVerifyData {
  bookingId: string;
  otp: string;
}

// 📌 Payment Data
export interface PaymentData {
  data: {
    id: string;
    bookingId: string;
    amount: number;
    status: PaymentStatus;
    method: PaymentMethod;
  };
  success?: boolean;
  message?: string;
}
export interface CreatePaymentData {
  bookingId: string;
  amount: number;
  method: PaymentMethod;
}
enum PaymentStatus {
  "PENDING",
  "COMPLETED",
  "FAILED",
  "REFUNDED",
}
export enum PaymentMethod {
  "CASH",
  "BANK_TRANSFER",
  "PAYPAL",
}

// 📌 Payment response

interface Payment {
  id: string;
  amount: number;
  status: "PENDING" | "COMPLETED" | "FAILED" | "REFUNDED";
  method: string;
  createdAt: string;
  booking: {
    startDate: string;
    endDate: string;
    pickUp: string;
    car: {
      name: string;
      image: string;
      model3d: string | null;
      price: number;
    };
    user: {
      firstName: string;
      lastName: string;
      email: string;
      address: string;
    };
  };
}

export interface PaymentResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: Payment[]; // Danh sách các đơn hàng thanh toán
}
