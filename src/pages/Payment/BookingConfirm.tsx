import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/authStore";
import { useBookingStore } from "@/store/bookingStore";
import {
  ArmchairIcon,
  CalendarRangeIcon,
  CarIcon,
  DropletsIcon,
  FuelIcon,
  TypeIcon,
} from "lucide-react";
import { useCarStore } from "@/store/carStore";
import { UpdateUser } from "@/types/types";
import { toast } from "sonner";
import { useUserStore } from "@/store/userStore";
import { CustomAlertDialog } from "@/components/modals/customAlertDialog";
import { useNavigate } from "react-router-dom";

// interface TotalFeeProps {
//   totalPrice: number;
// }

const BookingConfirm = () => {
  const { user } = useAuthStore();
  const { updateUser } = useUserStore();
  const navigate = useNavigate();
  const { booking, totalPrice, createBooking, clearBooking } =
    useBookingStore();
  const { car } = useCarStore();
  const [form, setForm] = useState<UpdateUser>({
    firstName: user?.data?.firstName || "",
    lastName: user?.data?.lastName || "",
    address: user?.data?.address || "",
    phone: user?.data?.phone || "",
  });
  useEffect(() => {
    if (user?.data) {
      setForm({
        firstName: user.data.firstName || "",
        lastName: user.data.lastName || "",
        address: user.data.address || "",
        phone: user.data.phone || "",
      });
    }
  }, [user]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Ngăn chặn reload trang
    try {
      if (user?.data.id) {
        await updateUser(user?.data.id, form);
        toast.success("User profile updated successfully!");
      } else {
        toast.error("User ID is missing.");
      }
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error("Error updating user profile:", error);
    }
  };
  const handleFormChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value || "",
    }));
  };

  const handleConfirm = async () => {
    await createBooking();
  };
  const handleClearBooking = () => {
    clearBooking();
    navigate("/products");
  };

  return (
    <div className="min-h-screen pb-2 text-white bg-black">
      <div className="container relative z-10 px-4 mx-auto antialiased pt-28 md:px-36">
        <div className="p-6 space-y-6 rounded-md shadow-lg bg-zinc-800/30 backdrop-blur-sm">
          <div className="text-center">
            <h1 className="text-3xl font-cinzel">Your Information</h1>
            <p className="text-sm text-gray-400">
              We will contact you as soon as possible.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 text-sm w-full font-montserrat">
            <form
              className="w-full max-w-2xl p-6 bg-zinc-900/80 shadow-lg rounded-lg space-y-4"
              onSubmit={handleSubmit}
            >
              {/* Full Name */}
              <div>
                <h1 className="text-gray-400 mb-1">Full Name</h1>
                <div className="flex gap-2">
                  <Input
                    name="firstName"
                    onChange={handleFormChange}
                    value={form.firstName}
                    placeholder="First Name"
                    className="w-1/2"
                  />
                  <Input
                    name="lastName"
                    onChange={handleFormChange}
                    value={form.lastName}
                    placeholder="Last Name"
                    className="w-1/2"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <h1 className="text-gray-400 mb-1">Email</h1>
                <Input
                  disabled
                  value={user?.data.email}
                  className="bg-gray-700"
                />
              </div>

              {/* Phone & Address */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h1 className="text-gray-400 mb-1">Phone Number</h1>
                  <Input
                    name="phone"
                    onChange={handleFormChange}
                    value={form.phone}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <h1 className="text-gray-400 mb-1">Address</h1>
                  <Input
                    name="address"
                    onChange={handleFormChange}
                    value={form.address}
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              {/* Button */}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  variant="revanta"
                  className="w-full md:w-1/2 h-12 font-bold text-lg"
                >
                  Update
                </Button>
              </div>
            </form>
          </div>

          <hr className="border-gray-600" />

          <div className="space-y-4">
            <h1 className="text-xl font-montserrat">Order Information</h1>
            <div className="p-6 space-y-4 rounded-lg shadow-md bg-neutral-900 font-montserrat">
              <h1 className="p-2 bg-yellow-500 md:text-base text-xs rounded-md font-bold text-black">
                Booking ID: {booking?.id}
              </h1>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-400">
                    Rental period
                  </p>
                  <div className="flex flex-col md:flex-row items-center gap-2 w-full font-montserrat">
                    <div className="flex items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-lg shadow-md">
                      <span className="text-lg">
                        <CalendarRangeIcon />
                      </span>
                      <p className="font-semibold">
                        {booking?.startDate
                          ? new Date(booking.startDate).toLocaleDateString(
                              "vi-VN"
                            )
                          : "N/A"}
                      </p>
                    </div>

                    <div className="flex  items-center gap-2 bg-yellow-500 text-black px-3 py-1 rounded-lg shadow-md">
                      <span className="text-lg">
                        <CalendarRangeIcon />
                      </span>
                      <p className="font-semibold">
                        {booking?.startDate
                          ? new Date(booking.endDate).toLocaleDateString(
                              "vi-VN"
                            )
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-400">
                    Pick-up Location
                  </p>
                  <Input value={booking?.pickUp || "N/A"} readOnly />
                </div>
              </div>

              <hr className="border-gray-600" />
              <div className="flex flex-col p-2 border justify-center items-center border-yellow-500 rounded-md gap-1">
                <p className="text-base md:text-2xl text-black bg-yellow-500 rounded-sm p-1 font-bold text-center w-full">
                  {car?.data.name} - {car?.data.year}
                </p>
                <img
                  src={car?.data.image}
                  className=" object-cover rounded-md size-full "
                />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap gap-x-3 text-black font-montserrat text-xs md:text-base">
                    <div className="flex gap-1 rounded-md text-yellow-500 w-fit justify-between items-center">
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <TypeIcon className="size-4" />
                        </span>
                        <p> {car?.data?.model}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 rounded-md text-yellow-500 w-fit justify-between items-center">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <ArmchairIcon className="size-4" />
                        </span>
                        <p> {car?.data?.seats}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 rounded-md text-yellow-500 w-fit justify-between items-center">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <CarIcon className="size-4" />
                        </span>
                        <p> {car?.data?.transmission}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 rounded-md text-yellow-500 w-fit justify-between items-center">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <FuelIcon className="size-4" />
                        </span>
                        <p> {car?.data?.fuel}</p>
                      </div>
                    </div>

                    <div className="flex gap-1 rounded-md text-yellow-500 w-fit justify-between items-center">
                      {" "}
                      <div className="flex  items-center justify-center gap-1">
                        <span>
                          <DropletsIcon className="size-4" />
                        </span>
                        <p> {car?.data?.consumption}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="border-gray-600" />

              <div className="flex justify-between text-base md:text-3xl font-semibold text-white">
                <p>Total Fee</p>
                <p>{totalPrice.toLocaleString()} USD</p>
              </div>
              <hr className="border-gray-600" />
              <div className="flex gap-1">
                <div className="w-full text-center">
                  <Button
                    className="size-full"
                    variant={"revanta"}
                    size={"lg"}
                    onClick={() => {
                      handleConfirm();
                    }}
                  >
                    Confirm
                  </Button>
                </div>

                <div className="w-full text-center">
                  <CustomAlertDialog
                    triggerText="Cancel"
                    title="Cancel Booking"
                    description="Are you sure you want to cancel your current order?"
                    confirmText="Yes"
                    cancelText="No"
                    triggerColor="size-full bg-red-500"
                    variant="Invert"
                    onConfirm={handleClearBooking}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div />
    </div>
  );
};

export default BookingConfirm;
