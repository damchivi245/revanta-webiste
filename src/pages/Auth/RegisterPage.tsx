import { RegisterForm } from "@/components/forms/register-form";

const RegisterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-zinc-800/20 rounded-3xl backdrop-blur-md md:p-10 ">
      <div className="w-full max-w-sm m-2 md:max-w-3xl">
        <RegisterForm />
      </div>
    </div>
  );
};
export default RegisterPage;
