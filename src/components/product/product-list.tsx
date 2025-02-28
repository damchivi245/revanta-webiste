import { Button } from "@/components/ui/button";
import { BackgroundGradient } from "../backgrounds/background-gradient";
import { Link } from "react-router-dom";

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
];

const ProductList = () => {
  return (
    <div className="w-full">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <BackgroundGradient
              key={product.id}
              className="w-full p-2 rounded-md bg-zinc-800 "
            >
              <Link to={`/product/${product.id}`}>
                {" "}
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-cover w-full rounded-md h-60"
                />
                <h3 className="text-xl text-white font-montserrat ">
                  {product.name}
                </h3>
                <p className="font-medium text-yellow-400">{product.price}</p>
                <Button variant="revanta" className="w-full mt-3">
                  Rent Now
                </Button>
              </Link>
            </BackgroundGradient>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
