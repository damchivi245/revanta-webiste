import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { InputOTPControlled } from "../input-otp";

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex justify-center items-center", className)}
      {...props}
    >
      <Card className="w-full overflow-hidden">
        <CardContent className="p-6">
          <form className="flex flex-col gap-6">
            {/* Logo và tiêu đề */}
            <div className="flex flex-col items-center text-center">
              <Link
                to="/"
                className="text-2xl font-bold text-yellow-500 font-cinzel"
              >
                revanta
              </Link>
              <p className="text-muted-foreground">
                Enter your email to send message
              </p>
            </div>

            {/* Email Input */}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="flex items-center justify-between gap-2">
              <InputOTPControlled />
              <Button>Resend</Button>
            </div>
            {/* Nút Submit */}
            <Button variant="revanta" type="submit" className="w-full">
              Send message
            </Button>

            {/* Quay lại trang login */}
            <div className="text-sm text-center">
              Remembered your password?{" "}
              <Link to="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
