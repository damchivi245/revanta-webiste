const categories = ["SUV", "Sedan", "Truck", "Electric"];
const brands = ["Toyota", "Honda", "Ford", "Tesla"];

const ProductFilter = () => {
  return (
    <div className="bg-zinc-500/20 backdrop-blur-sm w-full p-4 rounded-lg shadow-md font-montserrat border border-zinc-500 text-white">
      <h2 className="text-xl text-yellow-500 font-bold">Filter</h2>
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
                <input type="checkbox" />
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
                <input type="checkbox" />
                <span>{brand}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Apply Button */}
      <button className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
        Apply Filters
      </button>
    </div>
  );
};
export default ProductFilter;
