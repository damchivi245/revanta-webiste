import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCarStore } from "@/store/carStore";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";
import PaginationComponent from "../PaginationComponent";
import { SkeletonList } from "../SkeletonComponent";
import { Filters } from "@/pages/Product/ProductsPage";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";

interface ProductListProps {
  filters: Filters;
}

const ProductList = ({ filters }: ProductListProps) => {
  const { car, loading, error, fetchCar } = useCarStore();
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState({
    page: 1,
    limit: 9,
    name: "",
    brand: "",
    model: "",
  });

  // Cập nhật query khi filters thay đổi
  useEffect(() => {
    setQuery((prev) => ({
      ...prev,
      brand: filters.selectedBrand || "",
      model: filters.selectedModel || "",
    }));
  }, [filters]);

  // Fetch data khi query thay đổi
  useEffect(() => {
    const queryParams = new URLSearchParams(
      Object.entries(query)
        .filter(([, value]) => value !== "")
        .map(([key, value]) => [key, String(value)])
    ).toString();

    fetchCar(queryParams);
  }, [query, fetchCar]);

  const handleSearch = () => {
    setQuery((prev) => ({ ...prev, name: search, page: 1 }));
  };

  const handleClear = () => {
    setSearch("");
    setQuery((prev) => ({ ...prev, name: "", page: 1 }));
  };

  return (
    <div className="size-full">
      {error && <div className="text-red-500 h-screen">Error: {error}</div>}
      <div className="flex flex-col items-center space-y-3">
        {/* Tìm kiếm */}
        <div className="flex gap-2 w-full items-center justify-center">
          <div className="relative w-full">
            <Input
              type="text"
              className="text-white pr-10"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                className="absolute size-fit right-2 top-3 text-gray-400 hover:text-white"
                onClick={handleClear}
              >
                <XIcon size={18} />
              </button>
            )}
          </div>
          <Button variant={"revanta"} onClick={handleSearch}>
            Search
          </Button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="w-full  h-screen">
            <SkeletonList count={6} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 w-full h-full items-center justify-center">
            {Array.isArray(car?.data) && car?.data.length > 0 ? (
              car.data.map((product) => (
                <CardContainer
                  key={product.id}
                  className="w-full p-3 rounded-md bg-white/10 space-y-2 "
                >
                  <CardBody className="size-full ">
                    <CardItem translateZ="70">
                      <img
                        src={product.image || "/images/default-car.jpg"}
                        alt={product.name}
                        className="object-cover w-full rounded-md h-60"
                      />
                    </CardItem>

                    <div>
                      <CardItem translateZ="50">
                        <h3 className="text-xl text-white font-montserrat">
                          {product.name}
                        </h3>
                      </CardItem>
                      <CardItem translateZ="50">
                        <p className="font-medium text-yellow-400">
                          $
                          {new Intl.NumberFormat("en-US").format(product.price)}
                          /day
                        </p>
                      </CardItem>
                    </div>
                    <CardItem translateZ="50" className="w-full">
                      <Button asChild variant="revanta" className="w-full mt-3">
                        <Link to={`/product/${product.id}`}>Rent Now</Link>
                      </Button>
                    </CardItem>
                  </CardBody>
                </CardContainer>
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center h-[300px]">
                <p className="text-5xl text-gray-400">No cars available</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        <div className="flex gap-4 mt-4 w-full">
          <PaginationComponent
            currentPage={query.page ?? 1}
            totalPages={car?.pagination?.totalPages ?? 0}
            onPageChange={(newPage) =>
              setQuery((prev) => ({ ...prev, page: newPage }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
