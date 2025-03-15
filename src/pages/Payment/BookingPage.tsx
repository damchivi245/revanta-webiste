import { BackgroundBeams } from "@/components/backgrounds/background-beams";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DatePickerWithRange } from "@/components/DateRangePicker";

import { Button } from "@/components/ui/button";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";
import { useAuthStore } from "@/store/authStore";

const BookingPage = () => {
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const { user, fetchUser } = useAuthStore();

  console.log("user", user, fetchUser);
  const [name, setName] = useState(() => {
    const firstName = user?.data.firstName || "";
    const lastName = user?.data.lastName || "";
    return `${firstName} ${lastName}`.trim();
  });
  const [phone, setPhone] = useState(() => {
    const phone = user?.data.phone || "";
    return phone.trim();
  });

  return (
    <div className="min-h-screen pb-2 text-white bg-black">
      <div className="container relative z-10 px-4 mx-auto antialiased pt-28 md:px-36">
        <div className="p-6 space-y-6 rounded-md shadow-lg bg-zinc-800/30 backdrop-blur-sm">
          {/* Thông tin cá nhân */}
          <div className="text-center">
            <h1 className="text-2xl font-cinzel">Your Information</h1>
            <p className="text-sm text-gray-400">
              Please leave your contact information. We will contact you as soon
              as possible.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2 font-montserrat">
            <div className="flex flex-col gap-1">
              <h1 className="text-gray-500">Your Name</h1>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-gray-500">Your Phone Number</h1>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <hr className="border-gray-600" />

          {/* Thông tin đơn hàng */}
          <div className="space-y-4">
            <h1 className="text-xl font-montserrat">Order Information</h1>
            <div className="p-6 space-y-4 rounded-lg shadow-md bg-neutral-900 font-montserrat">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-400">
                    Rental period
                  </p>
                  <DatePickerWithRange sendDate={setDate} />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-400">
                    Pick-up Location
                  </p>
                  <Input />
                </div>
              </div>

              <div className="flex justify-between text-gray-300">
                <p>Rental Fee</p>
                <p>0$</p>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between text-gray-300">
                <p>VAT</p>
                <p>0$</p>
              </div>
              <div className="flex justify-between font-semibold text-white">
                <p>Total Fee</p>
                <p>0$</p>
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
        </div>
      </div>
      <BackgroundBeams />
    </div>
  );
};

export default BookingPage;
