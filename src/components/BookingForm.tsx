import { RadioGroup } from "@radix-ui/react-radio-group";
import { DatePickerWithRange } from "./DateRangePicker";
import SelectLocation from "./SelectLocation";
import { Button } from "./ui/button";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { MapPinCheckIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { addDays, differenceInDays } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

// import { useCarStore } from "@/store/carStore";

const locations = {
  "Ho Chi Minh": "258 Thanh Thai, District 10",
  "Ha Noi": "1 Dai Co Viet, Hai Ba Trung",
  "Da Nang": "45 Nguyen Van Linh, Hai Chau",
};
const BookingForm = () => {
  const [date, setDate] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 1),
  });
  const [city, setCity] = useState<keyof typeof locations>("Ho Chi Minh");
  const [selectedOption, setSelectedOption] = useState("option-one");
  const [customAddress, setCustomAddress] = useState("");
  const pickupLocation =
    selectedOption === "option-one" ? locations[city] : null;
  const deliveryAddress =
    selectedOption === "option-two" ? customAddress : null;
  console.log("Pick-up Location:", pickupLocation);
  console.log("Delivery Address:", deliveryAddress);

  const pricePerDay = 2500000;
  const finalTotalPrice = useMemo(() => {
    if (!date.from || !date.to) return 0;
    const days = differenceInDays(date.to, date.from) + 1;
    const total = days * pricePerDay * 1.1;
    return selectedOption === "option-two" ? total * 1.1 : total;
  }, [date, selectedOption]);

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
                  <div className="flex flex-col items-center gap-2 text-sm text-zinc-400">
                    <div className="flex gap-1">
                      <Input
                        onChange={(e) => setCustomAddress(e.target.value)}
                        placeholder="Enter delivery address"
                      />
                      <SelectLocation />
                    </div>
                    <div className="flex justify-between w-full gap-2">
                      <p>Delivery Fee:</p>
                      <p>10%</p>
                    </div>
                  </div>
                )}
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-3 text-base">
            <div className="flex items-center justify-between gap-4">
              <p>Car Rental Fee</p>
              <p>$ {new Intl.NumberFormat("en-US").format(pricePerDay)}</p>
            </div>
            <div className="flex items-center justify-between gap-4">
              <p>VAT</p>
              <p>10%</p>
            </div>

            <div className="flex items-center justify-between gap-4 p-1 font-bold text-black bg-yellow-400 rounded-md">
              <p>Total</p>
              <p>$ {new Intl.NumberFormat("en-US").format(finalTotalPrice)}</p>
            </div>
          </div>

          <div className="flex items-center justify-center">
            <Button className="w-full h-12 text-lg" variant={"revanta"} asChild>
              <Link to={`/booking`}> Booking</Link>
            </Button>
          </div>
        </div>
        <p className="text-sm text-center">
          {" "}
          By reserving and renting a car, you agree to the Terms of Use and
          Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default BookingForm;
