import PaymentDetail from "@/components/payment/PaymentDetail";

import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { useCarStore } from "@/store/carStore";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { usePaymentStore } from "@/store/paymentStore";
import { PaymentMethod } from "@/types/types";
const paymentMethods = [
  { id: 1, method: "Cash", name: "CASH" },
  { id: 2, method: "Bank Transfer", name: "BANK_TRANSFER" },
  { id: 3, method: "Paypal", name: "PAYPAL" },
];

const PaymentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [payment, setPayment] = useState(paymentMethods[0]);
  const { bookingsResponseData, days, totalPrice } = useBookingStore();
  const { createPayment } = usePaymentStore();
  const { car, fetchCarDetail } = useCarStore();
  const { user } = useAuthStore();
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

  useEffect(() => {
    if (id !== bookingsResponseData?.data.id) {
      navigate(`/product/${bookingsResponseData?.data.id}`, { replace: false });
    }
  }, [id, bookingsResponseData, navigate]);
  const handleCreatePayment = () => {
    createPayment({
      bookingId: bookingsResponseData?.data.id || "",
      method: payment.name as unknown as PaymentMethod,
      amount: totalPrice,
    });
    navigate("/");
  };
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
  if (!bookingsResponseData)
    return (
      <div className="pb-4 text-white flex items-center justify-center text-5xl bg-black pt-28 size-full font-montserrat">
        Payment not found
      </div>
    );
  return (
    <div className="pb-4 text-white bg-black pt-28 size-full font-montserrat">
      <div className="container px-2 md:mx-auto space-y-2">
        {car && user && (
          <PaymentDetail
            days={days}
            totalPrice={totalPrice}
            carData={car}
            paymentData={bookingsResponseData}
            userData={user}
          />
        )}
        <div className="space-y-2">
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
          <Button
            variant={"shimmer"}
            className="w-full h-12 text-xl"
            onClick={handleCreatePayment}
          >
            Confirm & Pay
          </Button>
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
