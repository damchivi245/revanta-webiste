/* eslint-disable @typescript-eslint/no-explicit-any */
import { RadioGroup } from "@radix-ui/react-radio-group";
import { DatePickerWithRange } from "./DateRangePicker";
import SelectLocation from "./SelectLocation";
import { Button } from "./ui/button";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { MapPinCheckIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import { differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useBookingStore } from "@/store/bookingStore";
import { toast } from "sonner";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const locations = {
  "Ho Chi Minh": "258 Thanh Thai, District 10",
  "Ha Noi": "1 Dai Co Viet, Hai Ba Trung",
  "Da Nang": "45 Nguyen Van Linh, Hai Chau",
};

interface BookingFormProps {
  carId: string;
  carPrice: number;
}

const BookingForm: React.FC<BookingFormProps> = ({ carId, carPrice }) => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [date, setDate] = useState<DateRange>({
    from: undefined,
    to: undefined,
  });
  const [city, setCity] = useState<keyof typeof locations>("Ho Chi Minh");
  const [selectedOption, setSelectedOption] = useState("option-one");
  const [customAddress, setCustomAddress] = useState("");
  const { setBooking, loading, setTotalPrice, setDays } = useBookingStore();

  const pickupLocation =
    selectedOption === "option-one" ? locations[city] : null;
  const deliveryAddress =
    selectedOption === "option-two" ? customAddress : null;

  const handleBooking = async () => {
    if (!user?.data) {
      toast.warning("Please log in to make a booking!");
      return;
    }
    if (!date.from || !date.to || date.from < new Date()) {
      toast.warning("Invalid date range");
      return;
    }
    if (selectedOption === "option-two" && !customAddress) {
      toast.warning("Please enter a delivery address");
      return;
    }
    try {
      const bookingId = uuidv4();

      await setBooking({
        id: bookingId,
        carId: carId || "",
        startDate: date.from,
        endDate: date.to,
        pickUp: pickupLocation || deliveryAddress || "",
      });
      navigate(`/booking-confirm`);
      toast.info("Please confirm your booking to continue");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const pricePerDay = carPrice;
  const days = useMemo(() => {
    if (!date.from || !date.to) return 0;
    return differenceInDays(date.to, date.from) + 1;
  }, [date]);

  const basePrice = useMemo(() => days * pricePerDay, [days, pricePerDay]);

  const tax = useMemo(() => basePrice * 0.05, [basePrice]);

  // Chỉ cộng thêm 50 nếu chọn "option-two"
  const optionFee = useMemo(
    () => (selectedOption === "option-two" ? 50 : 0),
    [selectedOption]
  );

  // Tổng tiền cuối cùng
  const finalTotalPrice = useMemo(
    () => basePrice + tax + optionFee,
    [basePrice, tax, optionFee]
  );

  useEffect(() => {
    setDays(days);
    setTotalPrice(finalTotalPrice);
  }, [finalTotalPrice, days, setTotalPrice, setDays]);

  return (
    <div className="p-2 bg-transparent border border-yellow-500 rounded-md size-full backdrop-blur-md">
      <div className="flex flex-col items-start justify-start gap-2 size-full font-montserrat">
        <div className="w-full">
          <h1>Car Rental Date</h1>
          <DatePickerWithRange sendDate={setDate} />
        </div>
        <div className="space-y-4 text-sm size-full">
          <div className="flex flex-col w-full gap-2">
            <RadioGroup
              value={selectedOption}
              onValueChange={setSelectedOption}
              className="w-full space-y-3"
            >
              {/* Option One */}
              <div className="flex flex-col w-full gap-3 p-4 border border-yellow-500 rounded-lg">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one" className="font-medium">
                    Pick-up Location
                  </Label>
                </div>
                {selectedOption === "option-one" && (
                  <div className="flex items-center justify-between w-full gap-2 text-sm text-zinc-400">
                    <div className="flex items-center w-full gap-1">
                      <MapPinCheckIcon className="text-yellow-500 size-4" />
                      <p className="text-xs">{locations[city]}</p>
                    </div>
                    <Select
                      onValueChange={(value) =>
                        setCity(value as keyof typeof locations)
                      }
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select City" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(locations).map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>

              {/* Option Two */}
              <div className="flex flex-col gap-2 p-4 border border-yellow-500 rounded-lg">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two" className="font-medium">
                    Car Delivery Service
                  </Label>
                </div>
                {selectedOption === "option-two" && (
                  <div className="flex flex-col items-center justify-between w-full gap-2 text-sm text-zinc-400">
                    <div className="flex items-center justify-between w-full gap-1">
                      <Input
                        onChange={(e) => setCustomAddress(e.target.value)}
                        placeholder="Enter delivery address"
                      />
                      <SelectLocation />
                    </div>
                    <div className="flex justify-between w-full gap-2">
                      <p>Delivery Fee:</p>
                      <p>+ $50</p>
                    </div>
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-3 text-base">
            <div className="flex items-center justify-between gap-4">
              <p>Car Rental Fee Per Day</p>
              <p>$ {new Intl.NumberFormat("en-US").format(pricePerDay)}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p>Tax</p>
              <p>$ {new Intl.NumberFormat("en-US").format(tax)} (5%)</p>
            </div>

            <div className="flex items-center justify-between gap-4 p-1 text-xl font-bold text-black bg-yellow-400 rounded-md">
              <p>Total</p>
              <p> {days}-day rent</p>

              <p>$ {new Intl.NumberFormat("en-US").format(finalTotalPrice)} </p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button
              className="w-full h-12 text-lg"
              variant={"revanta"}
              onClick={handleBooking}
              disabled={loading}
            >
              {loading ? "Processing..." : "Booking"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
