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
import CustomVerifyDialog from "@/components/modals/customVerifyDialog";

// interface TotalFeeProps {
//   totalPrice: number;
// }

const BookingConfirm = () => {
  const { user } = useAuthStore();
  const { updateUser } = useUserStore();
  const navigate = useNavigate();
  const {
    booking,
    totalPrice,
    days,
    bookingsResponseData,
    verifyBooking,
    createBooking,
    clearBooking,
  } = useBookingStore();
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

  const handleCreateBooking = async () => {
    await createBooking();
  };
  const handleClearBooking = () => {
    clearBooking();
    navigate("/products");
  };

  const handleVerifyOTP = async ({ pin }: { pin: string }) => {
    const { id: bookingId, otp } = bookingsResponseData?.data || {};
    if (!bookingId || !otp) {
      return;
    }

    await verifyBooking({ bookingId, otp: pin });
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

          <div className="flex flex-col items-center w-full gap-4 text-sm font-montserrat">
            <form
              className="w-full max-w-2xl p-6 space-y-4 rounded-lg shadow-lg bg-zinc-900/80"
              onSubmit={handleSubmit}
            >
              {/* Full Name */}
              <div>
                <h1 className="mb-1 text-gray-400">Full Name</h1>
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
                <h1 className="mb-1 text-gray-400">Email</h1>
                <Input
                  disabled
                  value={user?.data.email}
                  className="bg-gray-700"
                />
              </div>

              {/* Phone & Address */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <h1 className="mb-1 text-gray-400">Phone Number</h1>
                  <Input
                    name="phone"
                    onChange={handleFormChange}
                    value={form.phone}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <h1 className="mb-1 text-gray-400">Address</h1>
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
                  className="w-full h-12 text-lg font-bold md:w-1/2"
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
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-400">
                    Rental period
                  </p>
                  <div className="flex flex-col items-center w-full gap-2 md:flex-row font-montserrat">
                    <div className="flex items-center gap-2 px-3 py-1 text-black bg-yellow-500 rounded-lg shadow-md">
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

                    <div className="flex items-center gap-2 px-3 py-1 text-black bg-yellow-500 rounded-lg shadow-md">
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
              <div className="flex flex-col items-center justify-center gap-1 p-2 border border-yellow-500 rounded-md">
                <p className="w-full p-1 text-base font-bold text-center text-black bg-yellow-500 rounded-sm md:text-2xl">
                  {car?.data.name} - {car?.data.year}
                </p>
                <img
                  src={car?.data.image}
                  className="object-cover rounded-md size-full"
                />
                <div className="flex flex-col gap-1">
                  <div className="flex flex-wrap text-xs text-black gap-x-3 font-montserrat md:text-base">
                    <div className="flex items-center justify-between gap-1 text-yellow-500 rounded-md w-fit">
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <TypeIcon className="size-4" />
                        </span>
                        <p> {car?.data?.model}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-1 text-yellow-500 rounded-md w-fit">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <ArmchairIcon className="size-4" />
                        </span>
                        <p> {car?.data?.seats}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between gap-1 text-yellow-500 rounded-md w-fit">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <CarIcon className="size-4" />
                        </span>
                        <p> {car?.data?.transmission}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1 text-yellow-500 rounded-md w-fit">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <FuelIcon className="size-4" />
                        </span>
                        <p> {car?.data?.fuel}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1 text-yellow-500 rounded-md w-fit">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
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

              <div className="flex justify-between text-base font-semibold text-white md:text-3xl">
                <p>Total Fee</p>
                <p>{days}-day rent</p>
                <p>{totalPrice.toLocaleString()} USD</p>
              </div>
              <hr className="border-gray-600" />
              <div className="flex gap-1">
                <div className="w-full text-center">
                  <CustomVerifyDialog
                    title="Confirm Transaction"
                    description="Enter the OTP to complete your transaction."
                    verifyText="Confirm Payment"
                    triggerText="Confirm"
                    triggerColor="size-full"
                    variant="revanta"
                    onVerify={handleVerifyOTP}
                    onCreate={handleCreateBooking}
                  />
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
