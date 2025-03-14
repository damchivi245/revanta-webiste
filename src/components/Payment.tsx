import { RadioGroup } from "@radix-ui/react-radio-group";
import { DatePickerWithRange } from "./DateRangePicker";
import SelectLocation from "./SelectLocation";
import { Button } from "./ui/button";
import { RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { MapPinCheckIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Link } from "react-router-dom";

interface ChildProps {
  id: string;
}

const Payment = ({ id }: ChildProps) => {
  return (
    <div className="p-2 rounded-md size-full bg-zinc-700/70 backdrop-blur-md">
      <div className="flex flex-col items-start justify-start gap-2 size-full font-montserrat">
        <div className="w-full">
          <h1>Car rental date</h1>
          <DatePickerWithRange />
        </div>
        <div className="space-y-4 text-sm size-full">
          <div className="flex flex-col w-full gap-2">
            <RadioGroup defaultValue="option-one" className="w-full space-y-3">
              {/* Option One */}
              <div className="flex flex-col w-full gap-3 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option-one" id="option-one" />
                  <Label htmlFor="option-one" className="font-medium">
                    Car Pick-up Location
                  </Label>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <MapPinCheckIcon className="w-5 h-5 text-primary" />
                  <p>258 Sterol Street, Lava</p>
                </div>
              </div>

              {/* Option Two */}
              <div className="flex flex-col gap-2 p-4 border rounded-lg">
                <div className="flex items-center gap-2">
                  <RadioGroupItem value="option-two" id="option-two" />
                  <Label htmlFor="option-two" className="font-medium">
                    Car delivery service
                  </Label>
                </div>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                  <Input />
                  <SelectLocation />
                </div>
                <p>Delivery Fee:</p>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p>Car Rental Fee</p>
            <p>0 $</p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <p>VAT</p>
            <p>0 $</p>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p>Total</p>
            <p>0 $</p>
          </div>
          <div className="flex items-center justify-center">
            <Button className="w-full h-12 text-lg" variant={"revanta"} asChild>
              <Link to={`/booking/${id}`}> Rent</Link>
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

export default Payment;
