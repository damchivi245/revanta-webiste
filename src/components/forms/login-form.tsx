import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, loading } = useAuthStore();
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // ✅ Chặn reload trang
    await login(email, password);
  };

  useEffect(() => {
    if (user) {
      if (user?.data.role === "ADMIN") {
        navigate("/dashboard"); // ✅ Chuyển admin đến dashboard
      } else {
        navigate("/"); // ✅ Chuyển user thông thường về trang chủ
      }
    }
  }, [user, navigate]);

  return (
    <div className={cn("flex flex-col gap-3", className)} {...props}>
      <Card className="overflow-hidden ">
        <CardContent className="grid p-0 md:grid-cols-2 ">
          <form onSubmit={handleLogin} className="p-4 md:p-4">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <Link
                  to={"/"}
                  className="text-2xl font-bold text-yellow-500 font-cinzel"
                >
                  revanta
                </Link>
                <p className="text-balance text-muted-foreground">
                  Login to your account
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="pr-10"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 flex items-center text-gray-400 right-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <Link className="hover:underline" to={"/forgot-password"}>
                  Forgot Password?
                </Link>
              </div>
              <Button
                variant="revanta"
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
              </Button>

              <div className="text-sm text-center">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="underline underline-offset-4">
                  Sign up
                </Link>
              </div>
            </div>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/pictures/skybackground.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      {/* Đưa Modal ra ngoài form */}

      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        By clicking continue, you agree to our{" "}
        <Link to="#">Terms of Service</Link> and{" "}
        <Link to="#">Privacy Policy</Link>.
      </div>
    </div>
  );
}
