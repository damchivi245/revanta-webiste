import { BackgroundBeamsWithCollision } from "@/components/backgrounds/background-beams-with-collision";
import ProductList from "@/components/product/product-list";

const ProductsPage = () => {
  return (
    <BackgroundBeamsWithCollision className="size-full bg-black min-h-screen">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 mt-28 gap-8">
          <div className="p-6">
            <ProductList />
          </div>
        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default ProductsPage;
