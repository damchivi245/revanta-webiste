import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail } from "lucide-react";

const FooterComponent = () => {
  return (
    <footer className="relative w-full bg-gradient-to-r from-[#1e1e1e] via-[#2b2b2b] to-[#1e1e1e] text-white py-10">
      <div className="w-[90%] md:w-[64rem] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo & Description */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-yellow-500 font-cinzel">
            Revanta
          </h2>
          <p className="text-sm text-zinc-400 max-w-sm mt-2">
            Experience luxury like never before. Discover our exclusive
            collection.
          </p>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col md:flex-row items-center gap-6">
          <Link to="/" className="hover:text-yellow-500 transition">
            Home
          </Link>
          <Link to="/products" className="hover:text-yellow-500 transition">
            Collection
          </Link>
          <Link to="/about" className="hover:text-yellow-500 transition">
            About
          </Link>
          <Link to="/contact" className="hover:text-yellow-500 transition">
            Contact
          </Link>
        </nav>

        {/* Social Media */}
        <div className="flex items-center gap-4">
          <a
            href="#"
            className="p-2 rounded-full bg-zinc-800 hover:bg-yellow-500 transition"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-zinc-800 hover:bg-yellow-500 transition"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-zinc-800 hover:bg-yellow-500 transition"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="p-2 rounded-full bg-zinc-800 hover:bg-yellow-500 transition"
          >
            <Mail size={20} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-zinc-500 text-sm mt-6 border-t border-zinc-700 pt-4">
        &copy; {new Date().getFullYear()} Revanta. All Rights Reserved.
      </div>
    </footer>
  );
};

export default FooterComponent;
