import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/backgrounds/aurora-backgound";
import { LayoutGridComponent } from "@/components/LayoutGrid";

const slogans = [
  "Revanta – Where Luxury Meets the Road.",

  "Experience luxury cars with professional service.",

  "Experience luxury cars with professional service.",
];

const HomePage = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slogans.length);
    }, 3000); // Chuyển đổi sau mỗi 4 giây

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: -100 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );
  }, []);

  return (
    <AuroraBackground className="flex flex-col items-center justify-center gap-12 bg-black size-full">
      <div className="flex flex-col items-center justify-between gap-3 size-full">
        <div
          ref={textRef}
          className="relative z-10 p-6 mt-20 md:mt-32 text-center text-white bg-transparent rounded-xl"
        >
          <h1 className="text-5xl tracking-wide text-yellow-500 uppercase md:text-7xl font-cinzel">
            Luxury Car Rental
          </h1>
          <p className="mt-2 text-lg text-gray-300 font-montserrat">
            Experience luxury cars with professional service.
          </p>
          <Button size={"revanta"} variant={"revanta"}>
            Discover Now
          </Button>
        </div>
        <div className="relative flex items-center justify-center w-full h-16 overflow-hidden">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="absolute text-xl text-center text-white md:text-4xl font-cinzel"
          >
            {slogans[index]}
          </motion.div>
        </div>
      </div>

      <div className="size-full">
        <LayoutGridComponent />
      </div>
    </AuroraBackground>
  );
};

export default HomePage;
