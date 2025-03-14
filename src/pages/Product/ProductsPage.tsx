// import { BackgroundBeamsWithCollision } from "@/components/backgrounds/background-beams-with-collision";
import ProductFilter from "@/components/product/product-filter";
import ProductList from "@/components/product/product-list";
import { useState } from "react";

export interface Filters {
  selectedModel: string;
  selectedBrand: string;
}

const ProductsPage = () => {
  const [filters, setFilters] = useState({
    selectedModel: "",
    selectedBrand: "",
  });
  return (
    <div className="size-full bg-black">
      <div className="pt-28 container p-3 mx-auto">
        <div className="grid md:grid-cols-5 grid-cols-1 justify-center items-center gap-3 ">
          <div className=" col-span-1 size-full">
            <ProductFilter filters={filters} setFilters={setFilters} />
          </div>
          <div className=" col-span-4 size-full">
            <ProductList filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
