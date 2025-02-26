import { WavyBackground } from "@/components/backgrounds/wavy-background";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="relative flex flex-col size-full">
      <WavyBackground>
        <Outlet />
      </WavyBackground>
    </div>
  );
};

export default AuthLayout;
