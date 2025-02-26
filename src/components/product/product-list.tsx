import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "../backgrounds/background-gradient";

const products = [
  {
    id: 1,
    name: "Luxury Car A",
    price: "$100/day",
    image: "/pictures/maybachvision6.jpg",
  },
  {
    id: 2,
    name: "Luxury Car B",
    price: "$120/day",
    image: "/images/car-b.jpg",
  },
  {
    id: 3,
    name: "Luxury Car C",
    price: "$150/day",
    image: "/images/car-c.jpg",
  },
  {
    id: 3,
    name: "Luxury Car C",
    price: "$150/day",
    image: "/images/car-c.jpg",
  },
  {
    id: 3,
    name: "Luxury Car C",
    price: "$150/day",
    image: "/images/car-c.jpg",
  },
  {
    id: 3,
    name: "Luxury Car C",
    price: "$150/day",
    image: "/images/car-c.jpg",
  },
  {
    id: 3,
    name: "Luxury Car C",
    price: "$150/day",
    image: "/images/car-c.jpg",
  },
  {
    id: 3,
    name: "Luxury Car C",
    price: "$150/day",
    image: "/images/car-c.jpg",
  },
];

const ProductList = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {products.map((product) => (
            <BackgroundGradient
              key={product.id}
              className="bg-zinc-800 w-full p-2 rounded-md "
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-60 object-cover rounded-md"
              />
              <h3 className="text-xl font-montserrat text-white ">
                {product.name}
              </h3>
              <p className="text-yellow-400 font-medium">{product.price}</p>
              <Button variant="revanta" className="w-full mt-3">
                Rent Now
              </Button>
            </BackgroundGradient>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
