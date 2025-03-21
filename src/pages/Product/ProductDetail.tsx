// import { BackgroundBeamsWithCollision } from "@/components/backgrounds/background-beams-with-collision";
import CarModelViewer from "@/components/CarViewer";
import FullPageLoader from "@/components/FullPageLoader";
import BookingForm from "@/components/BookingForm";
import { CarouselSize } from "@/components/ProductCarousel";
import { useCarStore } from "@/store/carStore";
import {
  ArmchairIcon,
  Camera,
  CarIcon,
  DropletsIcon,
  FuelIcon,
  MapPin,
  Radar,
  Snowflake,
  Sun,
  TypeIcon,
  Users,
  Wifi,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const amenitiesList = [
  {
    name: "GPS Navigation",
    icon: <MapPin className="w-5 h-5 text-yellow-500" />,
  },
  {
    name: "Leather Seats",
    icon: <Users className="w-5 h-5 text-yellow-500" />,
  },
  {
    name: "Bluetooth Connectivity",
    icon: <Wifi className="w-5 h-5 text-yellow-500" />,
  },
  {
    name: "Backup Camera",
    icon: <Camera className="w-5 h-5 text-yellow-500" />,
  },
  { name: "Sunroof", icon: <Sun className="w-5 h-5 text-yellow-500" /> },
  {
    name: "Heated Seats",
    icon: <Snowflake className="w-5 h-5 text-yellow-500" />,
  },
  {
    name: "Blind Spot Monitoring",
    icon: <Radar className="w-5 h-5 text-yellow-500" />,
  },
];

function ProductDetailPage() {
  const { id } = useParams();
  const { car, fetchCarDetail, loading, error } = useCarStore();
  const navigate = useNavigate();
  const [hoveredAmenity, setHoveredAmenity] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState("default");

  useEffect(() => {
    if (id) {
      fetchCarDetail(id);
    }
  }, [id, fetchCarDetail]);

  useEffect(() => {
    if (car?.data?.id && id && car.data.id !== id) {
      navigate(`/product/${car.data.id}`, { replace: false });
    }
  }, [car, id, navigate, fetchCarDetail]);

  if (loading) return <FullPageLoader />;
  if (error) return <h1>Error: {error}</h1>;
  if (!car) return <h1>Car not found</h1>;

  return (
    <div className="text-white bg-black size-full">
      <div className="container mx-auto pt-28 size-full">
        <div className="flex flex-col items-center justify-center gap-3 ">
          <div className="relative w-full h-[80vh] md:h-screen border rounded-md border-yellow-500 bg-black/20 backdrop-blur-sm">
            <div className="absolute z-10 bg-transparent inset-3 size-fit">
              <div className="flex flex-col items-start justify-start gap-1">
                <h1 className="p-2 text-base font-bold text-yellow-500 rounded-md md:text-5xl font-montserrat bg-black/60 backdrop-blur-sm">
                  {car.data.name}
                </h1>
                <p className="p-2 font-thin rounded-md text-md font-montserrat bg-black/60 backdrop-blur-sm">
                  ${new Intl.NumberFormat("en-US").format(car.data.price)} {""}/
                  day
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 z-10 md:flex items-center justify-between w-full gap-2 hidden ">
              <div className="p-2 rounded-md backdrop-blur-sm bg-black/60">
                <div className="flex flex-col gap-1">
                  <p className="text-xl text-yellow-500">Characteristic:</p>
                  <div className="flex gap-2 text-black font-montserrat">
                    <div className="flex gap-1 p-2 rounded-md bg-yellow-500">
                      <span>
                        <TypeIcon />
                      </span>
                      <p>Type: {car.data.model}</p>
                    </div>
                    <div className="flex gap-1 p-2 rounded-md bg-yellow-500">
                      <span>
                        <ArmchairIcon />
                      </span>
                      <p>Seats: {car.data.seats}</p>
                    </div>
                    <div className="flex gap-1 p-2 rounded-md bg-yellow-500">
                      <span>
                        <CarIcon />
                      </span>
                      <p>Transmission: {car.data.transmission}</p>
                    </div>
                    <div className="flex gap-1 p-2 rounded-md bg-yellow-500">
                      <span>
                        <FuelIcon />
                      </span>
                      <p>Fuel: {car.data.fuel}</p>
                    </div>
                    <div className="flex gap-1 p-2 rounded-md bg-yellow-500">
                      <span>
                        <DropletsIcon />
                      </span>
                      <p>Consumption: {car.data.consumption}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-44 right-0 p-1 rounded-md backdrop-blur-sm bg-black/60 z-10 hidden md:block">
              <div className="flex flex-col gap-2">
                {/* <h1 className="text-xl text-yellow-500">Amenities </h1> */}
                <div className="size-full">
                  {amenitiesList.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="relative flex flex-col items-center group size-fit"
                        onMouseEnter={() => setHoveredAmenity(item.name)}
                        onMouseLeave={() => setHoveredAmenity(null)}
                      >
                        <div className="w-6 h-6 text-yellow-500 cursor-pointer transition-transform duration-200 group-hover:scale-110">
                          {item.icon}
                        </div>

                        {hoveredAmenity === item.name && (
                          <div className="absolute right-full z-30 mb-2 px-2 py-1 bg-black/80 text-white text-xs rounded-md whitespace-nowrap">
                            {item.name}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            {/* 🏁 Chọn màu xe */}
            <div className="absolute z-10 flex gap-2 right-6 bottom-4 size-fit bg-black/60 backdrop-blur-sm p-3 rounded-full">
              {car?.data?.colors?.length > 0 &&
                car.data.colors.map((color) => (
                  <button
                    key={color}
                    style={{
                      backgroundColor: color === "default" ? "gray" : color,
                    }}
                    className={`w-10 h-10 border-2 rounded-full ${
                      selectedColor === color
                        ? "border-yellow-500"
                        : "border-white"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
            </div>
            <div className="absolute z-10 p-2 rounded-md right-3 top-3 size-fit backdrop-blur-sm bg-black/60">
              <h1 className="font-montserrat text-xl">{car.data.year}</h1>
            </div>
            {car?.data?.model3d ? (
              <CarModelViewer
                modelPath={car.data.model3d}
                colors={selectedColor}
              />
            ) : (
              <div className="text-center text-white size-full">
                <img
                  src={car.data.image || "/images/default-car.jpg"}
                  alt={car.data.name}
                  className="object-cover h-full w-full rounded-md"
                />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 gap-2 p-2 md:p-0 md:grid-cols-3 size-full">
            <div className="col-span-2">
              <h1 className="text-3xl text-yellow-500 font-cinzel">Overview</h1>
              <div className="p-2 rounded-md backdrop-blur-sm bg-transparent text-sm md:hidden block border border-yellow-500">
                <div className="flex flex-col gap-1">
                  <p className="text-xl text-yellow-500">Characteristic:</p>
                  <div className="flex flex-wrap gap-2 text-black font-montserrat">
                    <div className="flex flex-wrap gap-1 rounded-md bg-yellow-500 w-fit justify-between items-center text-base p-2">
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <TypeIcon />
                        </span>
                        <p> {car.data.model}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 rounded-md bg-yellow-500 w-fit justify-between items-center text-base p-2">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <ArmchairIcon />
                        </span>
                        <p> {car.data.seats}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 rounded-md bg-yellow-500 w-fit justify-between items-center text-base p-2">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <CarIcon />
                        </span>
                        <p> {car.data.transmission}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 rounded-md bg-yellow-500 w-fit justify-between items-center text-base p-2">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <FuelIcon />
                        </span>
                        <p> {car.data.fuel}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 rounded-md bg-yellow-500 w-fit justify-between items-center text-base p-2">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
                        <span>
                          <DropletsIcon />
                        </span>
                        <p> {car.data.consumption}</p>
                      </div>
                    </div>

                    <div className="size-full space-y-1">
                      {amenitiesList.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="relative flex  items-center group gap-2"
                            onMouseEnter={() => setHoveredAmenity(item.name)}
                            onMouseLeave={() => setHoveredAmenity(null)}
                          >
                            <div className="w-6 h-6 text-yellow-500 cursor-pointer transition-transform duration-200 group-hover:scale-110">
                              {item.icon}
                            </div>

                            <div className=" p-2  text-yellow-500 text-sm rounded-md flex items-center mb-1 border border-yellow-500">
                              {item.name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              <p className="font-montserrat ">Overview</p>
            </div>
            <div className="col-span-1 size-full">
              {id && <BookingForm carId={id} carPrice={car.data.price} />}
            </div>
          </div>

          <div className="flex flex-col w-full gap-2 p-4">
            <h1 className="text-3xl font-montserrat">Similar vehicles</h1>
            <CarouselSize />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
