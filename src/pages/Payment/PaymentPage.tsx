import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { useCarStore } from "@/store/carStore";
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
import { useEffect, useState } from "react";

const paymentMethods = [
  { id: 1, method: "Cash" },
  { id: 2, method: "Bank Transfer" },
  { id: 3, method: "Paypal" },
];

const PaymentPage = () => {
  const [payment, setPayment] = useState(paymentMethods[0]);
  const { bookingsResponseData, days, totalPrice } = useBookingStore();
  const { car, fetchCarDetail } = useCarStore();
  const { user } = useAuthStore();
  console.log("Check user", user);
  const handlePaymentChange = (id: number) => {
    const selectedPayment = paymentMethods.find((p) => p.id === id);
    if (selectedPayment) {
      setPayment(selectedPayment);
    }
  };
  useEffect(() => {
    const carId = bookingsResponseData?.data?.carId;
    if (carId) {
      fetchCarDetail(carId);
    }
  }, [bookingsResponseData, fetchCarDetail]);

  const renderPaymentUI = () => {
    switch (payment.id) {
      case 1:
        return <CashPayment />;
      case 2:
        return <BankTransferPayment />;
      case 3:
        return <PaypalPayment />;
      default:
        return null;
    }
  };

  return (
    <div className="pb-4 text-white bg-black pt-28 size-full font-montserrat">
      <div className="container px-2 md:mx-auto">
        <div className="">
          {/* Thông tin đơn hàng + UI thanh toán */}
          <div className="p-4 space-y-2 border border-yellow-500 rounded-md bg-neutral-950 font-montserrat">
            <h2 className="mb-2 text-xl font-semibold text-center md:text-5xl font-cinzel ">
              Order Summary
            </h2>
            <div className="grid grid-cols-1 gap-3 p-3 text-xs rounded-md md:grid-cols-2 md:text-lg bg-zinc-800/30 backdrop-blur-sm">
              {/* Thông tin xe */}
              <div className="col-span-1 p-2 space-y-2 border border-yellow-500 rounded-md">
                <div className="flex items-center gap-1">
                  <CarIcon /> {car?.data.name}
                </div>
                <div className="flex items-center gap-1">
                  <CalendarHeartIcon /> {days} days
                </div>
                <div className="flex items-center gap-1">
                  <DollarSignIcon /> Price/Day: ${" "}
                  {new Intl.NumberFormat("en-US").format(car?.data?.price ?? 0)}
                </div>
                <div className="flex items-center gap-1">
                  <MapPinIcon /> Pick-up location:{" "}
                  {bookingsResponseData?.data?.pickUp}
                </div>
              </div>

              {/* Thông tin người dùng */}
              <div className="col-span-1 p-2 space-y-2 border border-yellow-500 rounded-md">
                <div className="flex items-center gap-1">
                  <UserIcon /> Fullname: {user?.data.lastName}{" "}
                  {user?.data.firstName}
                </div>
                <div className="flex items-center gap-1">
                  <PhoneIcon /> Phone: {user?.data.phone}
                </div>
                <div className="flex items-center gap-1">
                  <MailIcon /> Email: {user?.data.email}
                </div>
                <div className="flex items-center gap-1">
                  <HomeIcon /> Address: {user?.data.address}
                </div>
              </div>
            </div>
            <div className="w-full overflow-hidden rounded-md">
              <img
                src={car?.data.image}
                alt={car?.data.name}
                className="object-cover size-full"
              />
            </div>
            <div className="flex items-center justify-between w-full gap-2 p-2 text-xl font-extrabold text-black bg-yellow-500 rounded-md">
              <p>Total:</p>
              <p>
                {new Intl.NumberFormat("en-US").format(totalPrice ?? 0)} USD
              </p>
            </div>
            <div className="p-2 space-y-3 border border-yellow-500 rounded-md">
              <h1 className="text-xl font-semibold ">Payment Method</h1>
              <RadioGroup
                onValueChange={(value) => handlePaymentChange(Number(value))}
                defaultValue={payment.id.toString()}
              >
                {paymentMethods.map((value) => (
                  <div key={value.id} className="flex items-center space-x-2 ">
                    <RadioGroupItem
                      className=" bg-zinc-700"
                      value={value.id.toString()}
                      id={`r${value.id}`}
                    />
                    <Label className="text-lg" htmlFor={`r${value.id}`}>
                      {value.method}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            {/* UI theo phương thức thanh toán */}
            <div className="p-2 border border-yellow-500 rounded-md">
              {renderPaymentUI()}
            </div>

            {/* Nút xác nhận thanh toán */}
            <Button variant={"shimmer"} className="w-full h-12 text-xl">
              Confirm & Pay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// UI khi chọn Cash
const CashPayment = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Pay with Cash</h2>
    <p>Please prepare the exact amount when receiving the car.</p>
  </div>
);

// UI khi chọn Bank Transfer
const BankTransferPayment = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Bank Transfer Details</h2>
    <p>Bank: XYZ Bank</p>
    <p>Account: 123456789</p>
    <p>Transfer the amount and upload the receipt.</p>
  </div>
);

// UI khi chọn PayPal
const PaypalPayment = () => (
  <div className="p-4">
    <h2 className="text-lg font-semibold">Pay with PayPal</h2>
    <button className="px-4 py-2 mt-2 text-white bg-blue-600 rounded-md">
      Proceed to PayPal
    </button>
  </div>
);

export default PaymentPage;
