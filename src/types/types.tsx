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

export interface CreateBookingData {
  id: string;
  // userId: string;
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
