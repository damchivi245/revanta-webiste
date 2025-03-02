import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
const paymentMethod = [
  { id: 1, method: "Cash" },
  { id: 2, method: "Bank Transfer" },
  { id: 3, method: "Paypal" },
];

const PaymentPage = () => {
  const [payment, setPayment] = useState(paymentMethod[0]);
  const handlePaymentChange = (id: number) => {
    const selectedPayment = paymentMethod.find((p) => p.id === id);
    if (selectedPayment) {
      setPayment(selectedPayment);
    }
  };

  return (
    <div>
      {" "}
      {/* Chọn phương thức thanh toán */}
      <div className="grid grid-cols-4 gap-3">
        <div className="col-span-1">
          <h1 className="mb-2 text-lg font-semibold">Payment Method</h1>
          <RadioGroup
            onValueChange={(value) => handlePaymentChange(Number(value))}
            defaultValue={payment.id.toString()}
          >
            {paymentMethod.map((value) => (
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
        <div className="col-span-3 p-2 border rounded-md border-zinc-200">
          1
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
