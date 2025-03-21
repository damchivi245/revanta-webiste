// import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { AuroraBackground } from "@/components/backgrounds/aurora-backgound";
import { LayoutGridComponent } from "@/components/LayoutGrid";
import { DirectionAwareHoverComponent } from "@/components/DirectionAwareHover";
// import { CarouselSize } from "@/components/ProductCarousel";
// import { CarouselBrand } from "@/components/BrandCarousel";
// import { DatePickerWithRange } from "@/components/DateRangePicker";
// import { TimePicker } from "@/components/TimePicker";

import RentalInstructions from "@/components/RentalInstructions";
// import SelectLocation from "@/components/SelectLocation";
// import { SearchIcon } from "lucide-react";

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
    <AuroraBackground className="flex flex-col items-center justify-center bg-black size-full">
      <div className="flex flex-col items-center justify-center w-full h-full gap-5 mt-20 md:mt-36">
        <div
          ref={textRef}
          className="relative z-10 p-6 text-center text-white bg-transparent rounded-xl"
        >
          <h1 className="text-5xl tracking-wide text-yellow-500 uppercase md:text-7xl font-cinzel">
            Luxury Car Rental
          </h1>
          <p className="mt-2 text-lg text-gray-300 font-montserrat">
            Experience luxury cars with professional service.
          </p>
        </div>

        {/* <div className="w-full px-8 md:px-24 h-fit">
          <div className="text-white bg-transparent border border-yellow-500 size-full backdrop-blur-sm rounded-xl ">
            <div className="grid items-center justify-between w-full h-full grid-cols-1 gap-5 p-5 md:grid-cols-8 ">
              <div className="flex flex-col items-start justify-between w-full gap-1 col-span-full md:col-span-4">
                <h1 className="text-sm font-montserrat ">Pick up location</h1>
                <SelectLocation />
              </div>
              <div className="w-full col-span-full md:col-span-3">
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                  <div className="flex flex-col items-start justify-between w-full gap-1">
                    <h1 className="text-sm font-montserrat">Car rental date</h1>
                    <DatePickerWithRange />
                  </div>
                  <div className="flex flex-col items-start justify-between w-full gap-1">
                    <h1 className="text-sm font-montserrat">Pick up time</h1>
                    <TimePicker />
                  </div>
                </div>
              </div>
              <div className="text-center rounded-full size-full col-span-full md:col-span-1">
                <Button className="size-full" variant={"revanta"}>
                  <SearchIcon className="size-6" />
                </Button>
              </div>
            </div>
          </div>
        </div> */}

        <div className="relative flex items-center justify-center w-full h-16 overflow-hidden">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1 }}
            className="absolute px-5 text-xl text-center text-white md:text-4xl font-cinzel"
          >
            {slogans[index]}
          </motion.div>
        </div>
      </div>
      <div className="container flex flex-col items-center justify-center w-full h-full gap-12 mx-auto mb-4">
        {/* <div className="flex flex-col items-start justify-center w-full gap-5 p-8">
          <h1 className="text-xl text-white md:text-4xl font-cinzel">
            Favorite Cars
          </h1>
          <CarouselSize />
        </div>

        <div className="flex flex-col items-start justify-center w-full gap-5 p-8">
          <h1 className="text-xl text-white md:text-4xl font-cinzel">Brands</h1>
          <CarouselBrand />
        </div> */}

        <div className="size-full">
          <LayoutGridComponent />
        </div>

        <div className="">
          <DirectionAwareHoverComponent />
        </div>

        <div className="size-full">
          <RentalInstructions />
        </div>
      </div>
    </AuroraBackground>
  );
};

export default HomePage;
