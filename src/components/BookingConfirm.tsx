import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import { CalendarRangeIcon } from "lucide-react";

interface TotalFeeProps {
  totalPrice: number;
}

const BookingForm: React.FC<TotalFeeProps> = () => {
  const { user } = useAuthStore();
  const { booking, fetchBooking, loading } = useBookingStore();
  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  useEffect(() => {
    if (booking?.data?.id) {
      fetchBooking(booking.data.id);
    }
  }, [fetchBooking, booking?.data?.id]);

  useEffect(() => {
    if (booking?.data?.startDate && booking?.data?.endDate) {
      setDate({
        from: new Date(booking.data.startDate),
        to: new Date(booking.data.endDate),
      });
    }
  }, [booking]);

  const [name, setName] = useState(() =>
    `${user?.data?.firstName || ""} ${user?.data?.lastName || ""}`.trim()
  );
  const [phone, setPhone] = useState(() => user?.data?.phone?.trim() || "");

  return (
    <div className="min-h-screen pb-2 text-white bg-black">
      <div className="container relative z-10 px-4 mx-auto antialiased pt-28 md:px-36">
        <div className="p-6 space-y-6 rounded-md shadow-lg bg-zinc-800/30 backdrop-blur-sm">
          {loading ? (
            <p className="text-center text-yellow-500">
              Loading booking details...
            </p>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-cinzel">Your Information</h1>
                <p className="text-sm text-gray-400">
                  We will contact you as soon as possible.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 font-montserrat">
                <div className="flex flex-col gap-1">
                  <h1 className="text-gray-500">Your Name</h1>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h1 className="text-gray-500">Your Phone Number</h1>
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <hr className="border-gray-600" />

              <div className="space-y-4">
                <h1 className="text-xl font-montserrat">Order Information</h1>
                <div className="p-6 space-y-4 rounded-lg shadow-md bg-neutral-900 font-montserrat">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-gray-400">
                        Rental period
                      </p>
                      <div className="flex items-center justify-between gap-2 w-full font-montserrat">
                        <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-lg shadow-md">
                          <span className="text-lg">
                            <CalendarRangeIcon />
                          </span>
                          <p className="font-semibold">
                            {date.from?.toLocaleDateString("vi-VN") || "N/A"}
                          </p>
                        </div>
                        <p className="text-yellow-500 text-lg font-bold">
                          ---------→
                        </p>
                        <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-lg shadow-md">
                          <span className="text-lg">
                            <CalendarRangeIcon />
                          </span>
                          <p className="font-semibold">
                            {date.to?.toLocaleDateString("vi-VN") || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium text-gray-400">
                        Pick-up Location
                      </p>
                      <Input value={booking?.data?.pickUp || "N/A"} readOnly />
                    </div>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <p>Rental Fee</p>
                    {/* <p>{(totalFee / 1.1).toLocaleString()} USD</p> */}
                  </div>
                  <hr className="border-gray-600" />
                  <div className="flex justify-between text-gray-300">
                    <p>VAT (10%)</p>
                    {/* <p>{(totalFee - totalFee / 1.1).toLocaleString()} USD</p> */}
                  </div>
                  <div className="flex justify-between font-semibold text-white">
                    <p>Total Fee</p>
                    {/* <p>{totalFee.toLocaleString()} USD</p> */}
                  </div>
                  <hr className="border-gray-600" />
                  <div className="w-full text-center">
                    <Button
                      className="w-full h-12 font-extrabold text-md"
                      variant={"revanta"}
                      asChild
                    >
                      <Link to={`/payment`}>Confirm</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <div />
    </div>
  );
};

export default BookingForm;
