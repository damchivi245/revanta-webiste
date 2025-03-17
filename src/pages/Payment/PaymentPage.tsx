import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

const paymentMethods = [
  { id: 1, method: "Cash" },
  { id: 2, method: "Bank Transfer" },
  { id: 3, method: "Paypal" },
];

// 🛒 Giả lập đơn hàng thuê xe
const bookingInfo = {
  carName: "Tesla Model 3",
  rentalDays: 3,
  pricePerDay: 50,
  tax: 5,
};

const totalPrice =
  bookingInfo.rentalDays * bookingInfo.pricePerDay + bookingInfo.tax;

const PaymentPage = () => {
  const [payment, setPayment] = useState(paymentMethods[0]);

  const handlePaymentChange = (id: number) => {
    const selectedPayment = paymentMethods.find((p) => p.id === id);
    if (selectedPayment) {
      setPayment(selectedPayment);
    }
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

  return (
    <div className="bg-black pt-28 pb-4 size-full text-white font-montserrat">
      <div className="container mx-2 md:mx-auto">
        <div className="grid grid-cols-4 gap-3">
          {/* Chọn phương thức thanh toán */}
          <div className="col-span-1">
            <h1 className="mb-2 text-lg font-semibold">Payment Method</h1>
            <RadioGroup
              onValueChange={(value) => handlePaymentChange(Number(value))}
              defaultValue={payment.id.toString()}
            >
              {paymentMethods.map((value) => (
                <div key={value.id} className="flex items-center space-x-2">
                  <RadioGroupItem
                    className="bg-zinc-700"
                    value={value.id.toString()}
                    id={`r${value.id}`}
                  />
                  <Label htmlFor={`r${value.id}`}>{value.method}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Thông tin đơn hàng + UI thanh toán */}
          <div className="col-span-3 p-4 border rounded-md border-zinc-200">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            <div className="p-3 bg-gray-800 rounded-md">
              <p>🚗 Car: {bookingInfo.carName}</p>
              <p>📅 Days: {bookingInfo.rentalDays} days</p>
              <p>💰 Price/Day: ${bookingInfo.pricePerDay}</p>
              <p>🧾 Tax: ${bookingInfo.tax}</p>
              <p className="font-bold text-xl mt-2">Total: ${totalPrice}</p>
            </div>

            {/* UI theo phương thức thanh toán */}
            <div className="mt-4">{renderPaymentUI()}</div>

            {/* Nút xác nhận thanh toán */}
            <button className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md">
              Confirm & Pay
            </button>
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
