import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { useAuthStore } from "@/store/authStore";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const navigation = [
  { id: 1, name: "Grand Entrance", href: "/" },
  { id: 2, name: "Exquisite Collection", href: "/products" },
  { id: 3, name: "Exclusive Reservation", href: "/" },
];
const auth = [
  { id: 1, name: "Sign In", href: "/login" },
  { id: 2, name: "Sign Up", href: "/register" },
];

const Navigate = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <nav className="fixed inset-x-0 z-50 flex items-center justify-center top-5">
      <div className="w-[90%] md:w-[64rem] h-14 pl-6 pr-1 bg-black/50 shadow-lg backdrop-blur-md rounded-full flex justify-between items-center border border-zinc-700/50">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-widest text-yellow-500 md:text-3xl font-cinzel drop-shadow-lg">
          <Link to={"/"}>Revanta</Link>
        </div>

        {/* Menu Desktop */}
        <div className="items-center hidden gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className="px-5 py-2 text-white transition rounded-full font-montserrat bg-zinc-800 hover:bg-white/20"
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Account Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center md:flex w-12 h-12 border border-yellow-500 rounded-full shadow-md bg-transparent transition-all duration-300 hover:bg-yellow-500 hover:shadow-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage
                src={user?.data?.image || ""}
                alt={user?.data?.email || "User"}
                className="object-cover w-full h-full rounded-full"
              />
              <AvatarFallback className="bg-yellow-500 text-black font-bold flex items-center justify-center w-full h-full">
                {user?.data ? (
                  (
                    user?.data?.firstName?.[0] || user?.data?.email?.[0]
                  )?.toUpperCase()
                ) : (
                  <div>R</div>
                )}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="border-zinc-600 bg-zinc-800/60 backdrop-blur-md"
            align="end"
          >
            <DropdownMenuLabel className="text-white">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {user ? (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center w-full gap-1"
              >
                <div className="flex items-center justify-between gap-1">
                  <Link
                    to={`user/${user.data.id}`}
                    className="flex items-center gap-2 text-xl font-medium text-white transition-all duration-200 hover:text-yellow-300"
                  >
                    <span className="truncate">
                      {user.data.firstName || user.data.lastName
                        ? `${user.data.firstName || ""} ${
                            user.data.lastName || ""
                          }`
                        : user.data.email}
                    </span>
                  </Link>
                </div>
                <div className="grid w-full gap-1">
                  <Button variant={"revanta"}>Your order</Button>
                  <Button variant={"revanta"} onClick={handleLogout}>
                    Log Out
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex flex-col items-center justify-center w-full gap-2"
              >
                {auth.map((item) => (
                  <Button
                    className="w-full"
                    key={item.id}
                    value={item.name}
                    variant="revanta"
                  >
                    <Link to={item.href}>{item.name}</Link>
                  </Button>
                ))}
              </motion.div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Mobile Menu */}
        <div className="overflow-hidden border rounded-full md:hidden border-zinc-700">
          <Button className="" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-[4.5rem] w-auto bg-zinc-800/70 shadow-lg backdrop-blur-sm rounded-lg flex flex-col items-center p-4 md:hidden"
        >
          {user ? (
            <div className="grid items-center justify-center grid-cols-1 gap-1">
              <div className="flex items-center justify-center gap-1">
                <Avatar>
                  <AvatarImage
                    src={`${user.data.image}`}
                    alt={`${user.data.email}`}
                  />
                  <AvatarFallback className="bg-zinc-500/50">
                    {" "}
                    {(
                      user?.data?.firstName?.[0] || user?.data?.email?.[0]
                    )?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Link
                  to={`user/${user.data.id}`}
                  className="flex items-center gap-2 text-xl font-medium text-white transition-all duration-200 hover:text-yellow-300"
                >
                  <span className="truncate">
                    {user.data.firstName || user.data.lastName
                      ? `${user.data.firstName || ""} ${
                          user.data.lastName || ""
                        }`
                      : user.data.email}
                  </span>
                </Link>
              </div>
              <div className="grid gap-1 ">
                <Button variant={"revanta"}>Your order</Button>
                <Button variant={"revanta"} onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
            </div>
          ) : (
            <div>
              {auth.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="w-full p-2 text-center text-white transition rounded-lg font-montserrat hover:bg-zinc-700"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          )}

          <DropdownMenuSeparator className="w-full bg-white" />
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="w-full p-2 text-center text-white transition rounded-lg font-montserrat hover:bg-zinc-700"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

export default Navigate;
