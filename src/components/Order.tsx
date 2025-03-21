import { useCallback, useEffect } from "react";
import { TableList } from "./Table/Table";
import { usePaymentStore } from "@/store/paymentStore";

import CustomDialog from "./modals/customDialog";

const invoiceColumns = [
  { key: "booking.car.name", label: "Car" }, // Adjusted to match the expected key
  { key: "status", label: "Status" },
  { key: "method", label: "Method" },
  { key: "booking.startDate", label: "Start Date" },
  { key: "booking.endDate", label: "End Date" },
  { key: "createdAt", label: "Created At" },
  { key: "amount", label: "Total Price", className: "text-right" },
];

const Order = () => {
  const { fetchUserPayments, payments } = usePaymentStore();
  const fetchPayments = useCallback(() => {
    fetchUserPayments();
  }, [fetchUserPayments]);
  console.log("Check payments", payments);
  useEffect(() => {
    fetchPayments();
  }, [fetchPayments]);

  return (
    <div className="size-full bg-black/60 backdrop-blur-sm rounded-md p-4 relative border border-yellow-500 overflow-hidden">
      <div className="">
        <div className="absolute top-0 left-0 z-0 w-full h-10% md:h-10% bg-yellow-500 p-2">
          {" "}
          <h1 className="text-center text-3xl font-bold ">Your Order</h1>
        </div>
        <div className="mt-14 p-2 rounded-md border-yellow-500 border">
          <TableList
            columns={invoiceColumns}
            caption="A list of your recent invoices."
            data={payments?.data?.map((payment) => ({ ...payment })) ?? []}
            actions={(row) => (
              <div className="flex gap-2 justify-end">
                {payments && <CustomDialog data={row} />}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
