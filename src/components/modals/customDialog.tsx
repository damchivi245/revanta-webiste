/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarHeartIcon,
  CarIcon,
  DollarSignIcon,
  HomeIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
  EyeIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { FC } from "react";

interface CustomDialogProps {
  data: any;
}
const CustomDialog: FC<CustomDialogProps> = ({ data }) => {
  const calculateDays = (startDate: string, endDate: string): number => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return (
      Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    );
  };

  const days = calculateDays(data.booking.startDate, data.booking.endDate);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="revanta">
          {" "}
          <EyeIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh] max-w-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-yellow-500">ID: {data.id}</DialogTitle>
          <div>
            <div className="size-full text-white">
              {/* Thông tin đơn hàng + UI thanh toán */}
              <div className="p-4 space-y-2 border border-yellow-500 rounded-md bg-neutral-950 font-montserrat">
                <h2 className="mb-2 text-xl font-semibold text-center md:text-5xl font-cinzel ">
                  Order Summary
                </h2>
                <div className="grid grid-cols-1 gap-3 p-3 text-xs rounded-md md:grid-cols-2 md:text-lg bg-zinc-800/30 backdrop-blur-sm">
                  {/* Thông tin xe */}
                  <div className="col-span-1 p-2 space-y-2 border border-yellow-500 rounded-md">
                    <div className="flex items-center gap-1">
                      <CarIcon /> {data.booking.car.name}
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarHeartIcon /> {days} days
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSignIcon /> Price/Day: ${" "}
                      {new Intl.NumberFormat("en-US").format(
                        data?.booking.car.price ?? 0
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon /> Pick-up location: {data?.booking.pickUp}
                    </div>
                  </div>

                  {/* Thông tin người dùng */}
                  <div className="col-span-1 p-2 space-y-2 border border-yellow-500 rounded-md">
                    <div className="flex items-center gap-1">
                      <UserIcon /> Fullname: {data.booking.user.lastName}{" "}
                      {data.booking.user.firstName}
                    </div>
                    <div className="flex items-center gap-1">
                      <PhoneIcon /> Phone: {data.booking.user.phone}
                    </div>
                    <div className="flex items-center gap-1">
                      <MailIcon /> Email: {data.booking.user.email}
                    </div>
                    <div className="flex items-center gap-1">
                      <HomeIcon /> Address: {data.booking.user.address}
                    </div>
                  </div>
                </div>
                <div className="w-full overflow-hidden rounded-md">
                  <img
                    src={data.booking.car.image}
                    alt={data.booking.car.name}
                    className="object-cover w-full"
                  />
                </div>
                <div className="flex items-center justify-between w-full gap-2 p-2 text-xl font-extrabold text-black bg-yellow-500 rounded-md">
                  <p>Total:</p>
                  <p>
                    {new Intl.NumberFormat("en-US").format(data.amount ?? 0)}{" "}
                    USD
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
