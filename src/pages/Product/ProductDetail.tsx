import { BackgroundBeamsWithCollision } from "@/components/backgrounds/background-beams-with-collision";
import CarModelViewer from "@/components/CarViewer";
import { ArmchairIcon, CarIcon, DropletsIcon, FuelIcon } from "lucide-react";
import { useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Lamborghini Huracán",
    price: "200,000$",
    model: "/models3d/mercedes-maybach_vision_6.glb",
  },
  {
    id: 2,
    name: "Ferrari 488",
    price: "250,000$",
    model: "/models3d/mercedes-maybach_vision_6.glb",
  },
];

function ProductDetailPage() {
  const { id } = useParams(); // Lấy id từ URL
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <h1>Product not found</h1>;

  return (
    <BackgroundBeamsWithCollision className="text-white bg-black size-full">
      <div className="container mx-auto mt-28 size-full">
        <div className="flex flex-col items-center justify-center gap-3 ">
          <div className="relative w-full h-screen border rounded-md border-zinc-400 bg-white/20 backdrop-blur-sm">
            <div className="absolute z-10 p-2 rounded-md inset-3 size-fit bg-black/60 backdrop-blur-sm">
              <h1 className="text-3xl font-bold text-yellow-500 font-montserrat">
                {product.name}
              </h1>
            </div>
            <div className="absolute z-10 p-2 rounded-md left-3 bottom-3 size-fit backdrop-blur-sm bg-black/60">
              <div className="flex flex-col items-start justify-between gap-1">
                <p className="text-xl text-yellow-500">Characteristic:</p>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex gap-1 p-2 bg-zinc-950 rounded-md">
                    <span>
                      <ArmchairIcon />
                    </span>
                    <p>Seats:</p>
                  </div>
                  <div className="flex gap-1 p-2 bg-zinc-950 rounded-md">
                    <span>
                      <CarIcon />
                    </span>
                    <p>Transmission:</p>
                  </div>
                  <div className="flex gap-1 p-2 bg-zinc-950 rounded-md">
                    <span>
                      <FuelIcon />
                    </span>
                    <p>Fuel:</p>
                  </div>
                  <div className="flex gap-1 p-2 bg-zinc-950 rounded-md">
                    <span>
                      <DropletsIcon />
                    </span>
                    <p>Consumption:</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute right-3 bottom-3 z-10 p-2 rounded-md size-fit backdrop-blur-sm bg-black/60">
              <div className="flex flex-col items-start justify-between gap-2">
                <h1 className="text-xl text-yellow-500">Amenities </h1>
                <div>
                  1
                </div>
              </div>
            </div>
            <CarModelViewer modelPath={product.model} />
          </div>

          <div className="flex flex-col items-start justify-start gap-2 size-full">
            <h1 className="text-3xl font-cinzel text-yellow-500">Overview</h1>
            <p className="font-montserrat ">Overview</p>

          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}

export default ProductDetailPage;
