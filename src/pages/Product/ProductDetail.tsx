import { BackgroundBeamsWithCollision } from "@/components/backgrounds/background-beams-with-collision";
import CarModelViewer from "@/components/CarViewer";
import Payment from "@/components/Payment";
import { CarouselSize } from "@/components/ProductCarousel";
import { ArmchairIcon, CarIcon, DropletsIcon, FuelIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Lamborghini Huracán",
    price: "200,000$",
    model: "/models3d/mercedes-maybach_vision_6.glb",
    colors: ["default", "white", "black"],
  },
  {
    id: 2,
    name: "Ferrari 488",
    price: "250,000$",
    model: "/models3d/mercedes-maybach_vision_6.glb",
    colors: ["default", "red", "black"],
  },
];

function ProductDetailPage() {
  const { id } = useParams(); // Lấy id từ URL

  const product = products.find((p) => p.id === Number(id));
  const [selectedColor, setSelectedColor] = useState(
    product ? product.colors[0] : ""
  );
  if (!product) return <h1>Product not found</h1>;

  return (
    <BackgroundBeamsWithCollision className="text-white bg-black size-full">
      <div className="container mx-8 md:mx-auto mt-28 size-full">
        <div className="flex flex-col items-center justify-center gap-3 ">
          <div className="relative w-full h-[80vh] md:h-screen border rounded-md border-zinc-400 bg-white/20 backdrop-blur-sm">
            <div className="absolute z-10 bg-transparent inset-3 size-fit">
              <div className="flex flex-col items-start justify-start gap-1">
                <h1 className="p-2 text-base font-bold text-yellow-500 rounded-md md:text-3xl font-montserrat bg-black/60 backdrop-blur-sm">
                  {product.name}
                </h1>
                <p className="p-2 font-bold rounded-md text-md font-montserrat bg-black/60 backdrop-blur-sm">
                  Price
                </p>
              </div>
            </div>
            <div className="absolute bottom-0 z-10 flex items-center justify-between w-full gap-2">
              <div className="p-2 rounded-md backdrop-blur-sm bg-black/60">
                <div className="flex flex-col gap-1">
                  <p className="text-xl text-yellow-500">Characteristic:</p>
                  <div className="flex gap-2">
                    <div className="flex gap-1 p-2 rounded-md bg-zinc-950">
                      <span>
                        <ArmchairIcon />
                      </span>
                      <p>Seats:</p>
                    </div>
                    <div className="flex gap-1 p-2 rounded-md bg-zinc-950">
                      <span>
                        <CarIcon />
                      </span>
                      <p>Transmission:</p>
                    </div>
                    <div className="flex gap-1 p-2 rounded-md bg-zinc-950">
                      <span>
                        <FuelIcon />
                      </span>
                      <p>Fuel:</p>
                    </div>
                    <div className="flex gap-1 p-2 rounded-md bg-zinc-950">
                      <span>
                        <DropletsIcon />
                      </span>
                      <p>Consumption:</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 🏁 Chọn màu xe */}
              <div className="absolute z-10 flex items-center justify-center w-full gap-2 bottom-4">
                {product.colors.map((color) => (
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

              <div className="p-2 rounded-md backdrop-blur-sm bg-black/60">
                <div className="flex flex-col gap-2">
                  <h1 className="text-xl text-yellow-500">Amenities </h1>
                  <div>1</div>
                </div>
              </div>
            </div>

            <div className="absolute z-10 p-2 rounded-md right-3 top-3 size-fit backdrop-blur-sm bg-black/60">
              <h1>Year</h1>
            </div>
            <CarModelViewer modelPath={product.model} colors={selectedColor} />
          </div>

          <div className="grid grid-cols-1 gap-2 p-2 md:p-0 md:grid-cols-3 size-full">
            <div className="col-span-2">
              <h1 className="text-3xl text-yellow-500 font-cinzel">Overview</h1>
              <p className="font-montserrat ">Overview</p>
            </div>
            <div className="col-span-1 size-full">
              {id && <Payment id={id} />}
            </div>
          </div>
          <div className="flex flex-col w-full gap-2 p-8">
            <h1 className="text-3xl font-montserrat">Similar vehicles</h1>
            <CarouselSize />
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default ProductDetailPage;
