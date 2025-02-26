/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const categories = ["SUV", "Sedan", "Truck", "Electric"];
const brands = ["Toyota", "Honda", "Ford", "Tesla"];

const ProductFilter = ({
  onFilterChange,
}: {
  onFilterChange: (filters: any) => void;
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(50000);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      categories: selectedCategories,
      brands: selectedBrands,
      maxPrice: priceRange,
    });
  };

  return (
    <div className="bg-zinc-800/80 w-full xl:w-60 h-fit  p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">Filter</h2>
      <div className="">
        {/* Category Filter */}
        <div className="mt-4">
          <h3 className="font-semibold">Category</h3>
          <div className="flex xl:flex-col flex-row gap-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex justify-start items-center gap-1"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span>{category}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mt-4">
          <h3 className="font-semibold">Brand</h3>
          <div className="flex xl:flex-col flex-row gap-1">
            {" "}
            {brands.map((brand) => (
              <label
                key={brand}
                className="flex justify-start items-center gap-1"
              >
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mt-4">
        <h3 className="font-semibold">Max Price: ${priceRange}</h3>
        <input
          type="range"
          min="10000"
          max="100000"
          step="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full mt-2"
        />
      </div>

      {/* Apply Button */}
      <button
        className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        onClick={applyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilter;
