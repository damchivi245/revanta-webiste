/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useBookingStore } from "@/store/bookingStore";
import { sendOTP, verifyOTP, createBooking } from "@/services/bookingService";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const BookingForm = () => {
  const { selectedCar, startDate, endDate, email, setBooking, resetBooking } =
    useBookingStore();
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    await sendOTP(email);
    setOtpSent(true);
  };

  const handleVerifyOTP = async () => {
    const response = await verifyOTP(email, otp);
    if (response.data.success) {
      await createBooking({ selectedCar, startDate, endDate, email });
      alert("Đặt xe thành công!");
      resetBooking();
    } else {
      alert("OTP không hợp lệ!");
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">Đặt Xe</h2>
      <Input
        type="text"
        placeholder="Nhập Email"
        value={email}
        onChange={(e: any) => setBooking({ email: e.target.value })}
      />
      <Button onClick={handleSendOTP} disabled={otpSent}>
        Gửi OTP
      </Button>

      {otpSent && (
        <>
          <Input
            type="text"
            placeholder="Nhập OTP"
            value={otp}
            onChange={(e: any) => setOtp(e.target.value)}
          />
          <Button onClick={handleVerifyOTP}>Xác nhận đặt xe</Button>
        </>
      )}
    </div>
  );
};

export default BookingForm;
