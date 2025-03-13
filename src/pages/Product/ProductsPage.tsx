// import { BackgroundBeamsWithCollision } from "@/components/backgrounds/background-beams-with-collision";
import ProductFilter from "@/components/product/product-filter";
import ProductList from "@/components/product/product-list";

const ProductsPage = () => {
  return (
    <div className="size-full bg-black">
      <div className="pt-28 container mx-auto">
        <div className="grid grid-cols-5 gap-3 ">
          <div className=" col-span-1 size-full">
            <ProductFilter />
          </div>
          <div className=" col-span-4 size-full">
            <ProductList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
