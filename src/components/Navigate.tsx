import { Link } from "react-router-dom";
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
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed inset-x-0 z-50 flex items-center justify-center top-5">
      <div className="w-[90%] md:w-[64rem] h-14 pl-6 pr-1 bg-gradient-to-r from-[#1e1e1e]/70 via-[#2b2b2b]/70 to-[#1e1e1e]/70 shadow-lg backdrop-blur-md rounded-full flex justify-between items-center border border-zinc-700/50">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-widest text-yellow-500 md:text-3xl font-cinzel drop-shadow-lg">
          Revanta
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
          <DropdownMenuTrigger className="items-center justify-center hidden w-12 h-12 text-white border rounded-full shadow-md md:flex bg-zinc-900 border-zinc-700 hover:bg-zinc-800">
            R
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="border-0 bg-zinc-800/70 backdrop-blur-md"
            align="end"
          >
            <DropdownMenuLabel className="text-white">
              My Account
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col items-center justify-center w-full gap-2">
              {auth.map((item) => (
                <Button
                  className="w-full"
                  key={item.id}
                  value={item.name}
                  variant="revanta"
                >
                  {" "}
                  <Link to={item.href}>{item.name}</Link>
                </Button>
              ))}
            </div>
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
          className="absolute top-[4.5rem] w-[90%] bg-zinc-800/70 shadow-lg backdrop-blur-md rounded-lg flex flex-col items-center p-4 md:hidden"
        >
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
