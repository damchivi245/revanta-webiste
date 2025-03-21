import { FC } from "react";
import {
  CalendarHeartIcon,
  CarIcon,
  DollarSignIcon,
  HomeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { Car, BookingData, User } from "@/types/types";

interface PaymentDetailProps {
  carData?: Car;
  paymentData?: BookingData;
  userData?: User;
  days?: number;
  totalPrice?: number;
}

const PaymentDetail: FC<PaymentDetailProps> = ({
  carData,
  paymentData,
  totalPrice,
  userData,
  days,
}) => {
  return (
    <div className="size-full">
      {/* Thông tin đơn hàng + UI thanh toán */}
      <div className="p-4 space-y-2 border border-yellow-500 rounded-md bg-neutral-950 font-montserrat">
        <h2 className="mb-2 text-xl font-semibold text-center md:text-5xl font-cinzel ">
          Order Summary
        </h2>
        <div className="grid grid-cols-1 gap-3 p-3 text-xs rounded-md md:grid-cols-2 md:text-lg bg-zinc-800/30 backdrop-blur-sm">
          {/* Thông tin xe */}
          <div className="col-span-1 p-2 space-y-2 border border-yellow-500 rounded-md">
            <div className="flex items-center gap-1">
              <CarIcon /> {carData?.data.name}
            </div>
            <div className="flex items-center gap-1">
              <CalendarHeartIcon /> {days} days
            </div>
            <div className="flex items-center gap-1">
              <DollarSignIcon /> Price/Day: ${" "}
              {new Intl.NumberFormat("en-US").format(carData?.data?.price ?? 0)}
            </div>
            <div className="flex items-center gap-1">
              <MapPinIcon /> Pick-up location: {paymentData?.data?.pickUp}
            </div>
          </div>

          {/* Thông tin người dùng */}
          <div className="col-span-1 p-2 space-y-2 border border-yellow-500 rounded-md">
            <div className="flex items-center gap-1">
              <UserIcon /> Fullname: {userData?.data.lastName}{" "}
              {userData?.data.firstName}
            </div>
            <div className="flex items-center gap-1">
              <PhoneIcon /> Phone: {userData?.data.phone}
            </div>
            <div className="flex items-center gap-1">
              <MailIcon /> Email: {userData?.data.email}
            </div>
            <div className="flex items-center gap-1">
              <HomeIcon /> Address: {userData?.data.address}
            </div>
          </div>
        </div>
        <div className="w-full overflow-hidden rounded-md">
          <img
            src={carData?.data.image}
            alt={carData?.data.name}
            className="object-cover size-full"
          />
        </div>
        <div className="flex items-center justify-between w-full gap-2 p-2 text-xl font-extrabold text-black bg-yellow-500 rounded-md">
          <p>Total:</p>
          <p>{new Intl.NumberFormat("en-US").format(totalPrice ?? 0)} USD</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
