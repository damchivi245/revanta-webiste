import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Filters } from "@/pages/Product/ProductsPage";

const models = [
  { id: 1, name: "SUV" },
  { id: 2, name: "TU" },
  { id: 3, name: "Mer" },
  { id: 4, name: "CAR" },
];

const brands = [
  { id: 1, name: "Toyota" },
  { id: 2, name: "Tesla" },
  { id: 3, name: "Mercides" },
  { id: 4, name: "OHI" },
];

const ProductFilter = ({
  filters,
  setFilters,
}: {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
}) => {
  return (
    <div className="bg-zinc-500/20  backdrop-blur-sm w-full p-3 rounded-lg shadow-md font-montserrat border border-zinc-500 text-white relative space-y-10 overflow-hidden">
      {/* Header */}
      <div className="bg-yellow-500 p-2 rounded-t-lg absolute top-0 left-0 w-full">
        <h1 className="text-xl text-black font-bold text-center">Filter</h1>
      </div>

      <div className="space-y-3">
        {/* Model Filter */}
        <div>
          <h3 className="font-semibold">Models</h3>
          <RadioGroup
            value={filters.selectedModel}
            onValueChange={(val) =>
              setFilters({ ...filters, selectedModel: val })
            }
          >
            <div className="flex flex-col gap-2">
              {models.map((category) => (
                <div key={category.id} className="flex items-center gap-2">
                  <RadioGroupItem
                    value={category.name}
                    id={category.id.toString()}
                  />
                  <Label htmlFor={category.id.toString()}>
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="h-0.5 bg-yellow-500 opacity-50"></div>

        {/* Brand Filter */}
        <div>
          <h3 className="font-semibold">Brand</h3>
          <RadioGroup
            value={filters.selectedBrand}
            onValueChange={(val) =>
              setFilters({ ...filters, selectedBrand: val })
            }
          >
            <div className="flex flex-col gap-2">
              {brands.map((brand) => (
                <div key={brand.id} className="flex items-center gap-2">
                  <RadioGroupItem value={brand.name} id={brand.id.toString()} />
                  <Label htmlFor={brand.id.toString()}>{brand.name}</Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>

        {/* Clear Filters Button */}
        <Button
          variant="revanta"
          className="w-full flex justify-center items-center"
          onClick={() => setFilters({ selectedModel: "", selectedBrand: "" })}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default ProductFilter;
