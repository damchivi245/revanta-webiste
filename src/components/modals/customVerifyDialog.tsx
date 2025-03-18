/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";

// ✅ Schema xác thực OTP
const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

const CustomVerifyDialog = ({
  title = "Enter One-Time Password",
  description = "Please enter the one-time password sent to your phone.",
  cancelText = "Close",
  verifyText = "Verify",
  triggerText = "Open",
  triggerColor,
  variant = "default",
  onVerify,
  onCreate,
}: {
  title?: string;
  description?: string;
  cancelText?: string;
  verifyText?: string;
  triggerText?: string;
  triggerColor?: string;
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "revanta"
    | "Invert"
    | "shimmer";
  onVerify?: (data: { pin: string }) => void;
  onCreate?: () => void;
}) => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { pin: "" },
  });

  const handleVerifyOTP = (data: { pin: string }) => {
    if (!data.pin) {
      return;
    }
    onVerify?.(data);
    navigate("/payment");
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          className={`${triggerColor}`}
          onClick={onCreate}
        >
          {triggerText}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" font-montserrat">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>{description}</AlertDialogDescription>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleVerifyOTP)}
            className="flex flex-col w-full space-y-4 "
          >
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name="pin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          {[...Array(6)].map((_, i) => (
                            <InputOTPSlot key={i} index={i} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>{description}</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <Button variant={"secondary"}>Resend</Button> */}
            </div>

            <AlertDialogFooter>
              <AlertDialogCancel>{cancelText}</AlertDialogCancel>

              <Button variant={"revanta"} type="submit">
                {verifyText}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomVerifyDialog;
