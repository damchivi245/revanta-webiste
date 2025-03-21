import { LoginForm } from "@/components/forms/login-form";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-transparent md:p-10 ">
      <div className="w-full max-w-sm m-2 md:max-w-3xl ">
        <LoginForm />
      </div>
    </div>
  );
}
