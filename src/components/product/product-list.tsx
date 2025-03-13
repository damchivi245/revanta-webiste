import { Button } from "@/components/ui/button";
// import { BackgroundGradient } from "../backgrounds/background-gradient";
import { Link } from "react-router-dom";
import { useCarStore } from "@/store/carStore";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";
import PaginationComponent from "../PaginationComponent";
import { SkeletonList } from "../SkeletonComponent";

const ProductList = () => {
  const { car, loading, error, fetchCar } = useCarStore();
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 2,
  });
  useEffect(() => {
    fetchCar(filters);
  }, [filters, fetchCar]);

  const handleSearch = () => {
    setFilters((prev) => ({ ...prev, name: search, page: 1 }));
  };

  // Xử lý xóa input
  const handleClear = () => {
    setSearch("");
    setFilters((prev) => ({ ...prev, name: "", page: 1 }));
  };

  return (
    <div className="size-full">
      {error && <div className="text-red-500 h-screen">Error: {error}</div>}
      <div className="flex flex-col items-center space-y-3">
        {/* Danh sách xe */}
        <div className=" flex gap-2 w-full items-center justify-center font-montserrat">
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
        {/* Trạng thái loading */}
        {loading ? (
          <div className="size-full">
            <SkeletonList count={6} />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3 w-full">
            {Array.isArray(car?.data) ? (
              car.data.map((product) => (
                <div
                  key={product.id}
                  className="w-full p-2 rounded-md bg-zinc-800 space-y-2"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image || "/images/default-car.jpg"}
                      alt={product.name}
                      className="object-cover w-full rounded-md h-60"
                    />
                    <h3 className="text-xl text-white font-montserrat ">
                      {product.name}
                    </h3>
                    <p className="font-medium text-yellow-400">
                      ${new Intl.NumberFormat("en-US").format(product.price)}
                      /day
                    </p>
                    <Button variant="revanta" className="w-full mt-3">
                      Rent Now
                    </Button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No cars available</p>
            )}
          </div>
        )}

        {/* Nút chuyển trang */}
        <div className="flex gap-4 mt-4">
          <PaginationComponent
            currentPage={filters.page ?? 1}
            totalPages={car?.pagination?.totalPages ?? 0}
            onPageChange={(newPage) =>
              setFilters((prev) => ({ ...prev, page: newPage }))
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductList;
